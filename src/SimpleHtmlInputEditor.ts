import {Selection} from './Selection';
import type {EditorFacade, SimpleChange} from './types';

export class SimpleHtmlInputEditor implements EditorFacade {
  public selection!: Selection;
  public onchange?: (change: SimpleChange[] | void) => void;
  public onselection?: () => void;

  constructor(protected readonly input: HTMLInputElement | HTMLTextAreaElement) {
    input.addEventListener('input', this.onInput as any);
    document.addEventListener('selectionchange', this.onSelectionChange);
  }

  public get(): string {
    return this.input.value;
  }

  public getLength(): number {
    return this.input.value.length;
  }

  public set(text: string): void {
    this.input.value = text;
  }

  public getSelection(): [number, number, -1 | 0 | 1] | null {
    const {selectionStart, selectionEnd, selectionDirection} = this.input;
    const direction = selectionDirection === 'backward' ? -1 : selectionDirection === 'forward' ? 1 : 0;
    return [
      typeof selectionStart === 'number' ? selectionStart : -1,
      typeof selectionEnd === 'number' ? selectionEnd : -1,
      direction,
    ];
  }

  public setSelection(start: number, end: number, direction: -1 | 0 | 1): void {
    const input = this.input;
    input.selectionStart = start > -1 ? start : null;
    input.selectionEnd = end > -1 ? end : null;
    input.selectionDirection = direction === -1 ? 'backward' : direction === 1 ? 'forward' : 'none';
  }

  private readonly onInput = (e: Event): void => {
    const event = e as InputEvent;
    const {input} = this;
    const {data, inputType, isComposing} = event;
    if (isComposing) return;
    switch (inputType) {
      case 'insertText': {
        if (!data || data.length !== 1) break;
        const {selectionStart, selectionEnd} = input;
        if (selectionStart === null || selectionEnd === null) break;
        if (selectionStart !== selectionEnd) break;
        if (selectionStart <= 0) break;
        const selection = this.selection;
        if (selectionStart - data.length !== selection.start) break;
        if (typeof selection.end !== 'number' || typeof selection.end !== 'number') break;
        const remove = selection.end - selection.start;
        const change: SimpleChange = [selection.start, remove, data];
        this.onchange!([change]);
        return;
      }
      case 'deleteContentBackward': {
        const {start, end} = this.selection;
        if (typeof start !== 'number' || typeof end !== 'number') break;
        const change: SimpleChange = start === end ? [start - 1, 1, ''] : [start, end - start, ''];
        this.onchange!([change]);
        return;
      }
    }
    this.onchange!();
  };

  private readonly onSelectionChange = () => {
    this.onselection?.();
  };

  public dispose(): void {
    this.input.removeEventListener('input', this.onInput as any);
    document.removeEventListener('selectionchange', this.onSelectionChange);
  }
}
