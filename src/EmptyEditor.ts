import type {EditorFacade, SimpleChange} from './types';

export class EmptyEditor implements EditorFacade {
  public onchange?: (change: SimpleChange | void) => void;
  public onselection?: () => void;

  constructor(protected readonly input: HTMLInputElement | HTMLTextAreaElement) {
    throw new Error('Not implemented');
  }

  public get(): string {
    throw new Error('Not implemented');
  }

  public getLength(): number {
    throw new Error('Not implemented');
  }

  public set(text: string): void {
    throw new Error('Not implemented');
  }

  public getSelection(): [number, number, -1 | 0 | 1] | null {
    throw new Error('Not implemented');
  }

  public setSelection(start: number, end: number, direction: -1 | 0 | 1): void {
    throw new Error('Not implemented');
  }

  public dispose(): void {
    throw new Error('Not implemented');
  }
}
