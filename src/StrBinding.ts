import {invokeFirstOnly} from './util';
import {Selection} from './Selection';
import {applyChange} from './util';
import type {EditorFacade, SimpleChange} from './types';
import type {StrApi} from 'json-joy/es2020/json-crdt';
const diff = require('fast-diff');

const enum DIFF_CHANGE_TYPE {
  DELETE = -1,
  EQUAL = 0,
  INSERT = 1,
}

export class StrBinding {
  public static bind = (str: StrApi, editor: EditorFacade, polling?: boolean) => {
    const binding = new StrBinding(str, editor);
    binding.syncFromModel();
    binding.bind(polling);
    return binding.unbind;
  };

  protected readonly selection: Selection;
  protected readonly race = invokeFirstOnly();

  constructor(
    protected readonly str: StrApi,
    protected readonly editor: EditorFacade,
  ) {
    editor.selection = this.selection = new Selection();
  }

  // ---------------------------------------------------------------- Selection

  protected saveSelection() {
    const {str, editor, selection} = this;
    const [selectionStart, selectionEnd, selectionDirection] = editor.getSelection?.() || [-1, -1, 0];
    const {start, end} = selection;
    const now = Date.now();
    const tick = str.api.model.tick;
    // Return early to avoid excessive RGA queries.
    if (start === selectionStart && end === selectionEnd && (tick === selection.tick || now - selection.ts < 3000))
      return;
    selection.start = selectionStart;
    selection.end = selectionEnd;
    selection.dir = selectionDirection;
    selection.ts = now;
    selection.tick = tick;
    selection.startId = typeof selectionStart === 'number' ? str.findId((selectionStart ?? 0) - 1) ?? null : null;
    selection.endId = typeof selectionEnd === 'number' ? str.findId((selectionEnd ?? 0) - 1) ?? null : null;
  }

  // ----------------------------------------------------- Model-to-Editor sync

  public syncFromModel() {
    this.editor.set(this.str.view());
  }

  protected readonly onModelChange = () => {
    this.race(() => {
      this.syncFromModel();
      const {editor, selection, str} = this;
      if (editor.setSelection) {
        const start = selection.startId ? str.findPos(selection.startId) + 1 : -1;
        const end = selection.endId ? str.findPos(selection.endId) + 1 : -1;
        editor.setSelection(start, end, selection.dir);
      }
      this.saveSelection();
    });
  };

  // ----------------------------------------------------- Editor-to-Model sync

  public syncFromEditor() {
    const {str, editor} = this;
    const view = str.view();
    const value = editor.get();
    if (value === view) return;
    const selection = this.selection;
    const caretPos: number | undefined = selection.start === selection.end ? selection.start ?? undefined : undefined;
    const changes = diff(view, value, caretPos);
    const changeLen = changes.length;
    let pos: number = 0;
    for (let i = 0; i < changeLen; i++) {
      const change = changes[i];
      const [type, text] = change;
      switch (type) {
        case DIFF_CHANGE_TYPE.DELETE: {
          str.del(pos, text.length);
          break;
        }
        case DIFF_CHANGE_TYPE.EQUAL: {
          pos += text.length;
          break;
        }
        case DIFF_CHANGE_TYPE.INSERT: {
          str.ins(pos, text);
          pos += text.length;
          break;
        }
      }
    }
  }

  private readonly onchange = (changes: SimpleChange[] | void) => {
    this.race(() => {
      if (changes) {
        const view = this.str.view();
        let expected = view;
        for (const change of changes) expected = applyChange(expected, change);
        const editor = this.editor;
        const areEqual =
          (editor.getLength ? expected.length === editor.getLength() : true) && expected === editor.get();
        if (areEqual) {
          const str = this.str;
          for (const change of changes) {
            const [position, remove, insert] = change;
            if (remove) str.del(position, remove);
            if (insert) str.ins(position, insert);
          }
          return;
        }
      }
      this.syncFromEditor();
      this.saveSelection();
    });
  };

  // ------------------------------------------------------------------ Polling

  public pollingInterval: number = 1000;
  private _p: number | null | unknown = null;

  private readonly pollChanges = () => {
    this._p = setTimeout(() => {
      this.race(() => {
        try {
          const view = this.str.view();
          const editor = this.editor;
          const needsSync = (editor.getLength ? view.length !== editor.getLength() : false) || view !== editor.get();
          if (needsSync) this.syncFromEditor();
        } catch {}
        if (this._p) this.pollChanges();
      });
    }, this.pollingInterval);
  };

  public stopPolling() {
    if (this._p) clearTimeout(this._p as any);
    this._p = null;
  }

  // ------------------------------------------------------------------ Binding

  private _s: (() => void) | null = null;

  public readonly bind = (polling?: boolean) => {
    this.syncFromModel();
    const editor = this.editor;
    editor.onchange = this.onchange;
    editor.onselection = () => this.saveSelection();
    if (polling) this.pollChanges();
    this._s = this.str.api.onChange.listen(this.onModelChange);
  };

  public readonly unbind = () => {
    this.stopPolling();
    this._s?.();
    this.editor.dispose?.();
  };
}
