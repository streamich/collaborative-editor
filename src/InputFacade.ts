import type {EditorFacade, SimpleChange} from './types';

export class InputFacade0 implements EditorFacade {
  constructor(protected readonly input: HTMLInputElement | HTMLTextAreaElement) {}

  public get(): string {
    return this.input.value;
  }

  public set(text: string): void {
    this.input.value = text;
  }
}

export class InputFacade1 extends InputFacade0 {
  public onchange?: (change: SimpleChange[] | void) => void;

  constructor(protected readonly input: HTMLInputElement | HTMLTextAreaElement) {
    super(input);
    input.addEventListener('input', this.onInput as any);
  }

  public getLength(): number {
    return this.input.value.length;
  }

  private readonly onInput = () => {
    this.onchange?.();
  };

  public dispose(): void {
    this.input.removeEventListener('input', this.onInput as any);
  }
}

export class InputFacade2 extends InputFacade1 {
  public onselection?: () => void;

  constructor(protected readonly input: HTMLInputElement | HTMLTextAreaElement) {
    super(input);
    document.addEventListener('selectionchange', this.onSelectionChange);
  }

  public getSelection(): [number, number, -1 | 0 | 1] | null {
    const input = this.input;
    const {selectionStart, selectionEnd, selectionDirection} = input;
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

  private readonly onSelectionChange = () => {
    this.onselection!();
  };

  public dispose(): void {
    super.dispose();
    document.removeEventListener('selectionchange', this.onSelectionChange);
  }
}
