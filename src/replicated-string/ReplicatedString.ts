import type {ITimestampStruct} from 'json-joy/lib/json-crdt';
import type {CollaborativeString} from '../types';
import type {CollaborativeStringFacade} from './types';

const ID: ITimestampStruct = {sid: 0, time: 0};

export class ReplicatedString implements CollaborativeString {
  public readonly view: () => string;
  public readonly ins: (pos: number, text: string) => void;
  public readonly del: (pos: number, length: number) => void;
  public readonly findId: CollaborativeString['findId'];
  public readonly findPos: CollaborativeString['findPos'];
  public readonly api: CollaborativeString['api'];

  constructor (protected readonly facade: CollaborativeStringFacade) {
    this.view = facade.view;
    this.ins = facade.ins;
    this.del = facade.del;
    this.findId = facade.findId ?? (() => ID);
    this.findPos = facade.findPos ?? (() => -1);
    this.api = {
      onChange: {
        listen: this.facade.onChange,
      },
      transaction: (callback: () => void): void => {
        this.facade.transaction?.(callback) ?? callback();
      },
      model: {
        get tick(): number {
          return facade.tick?.() ?? 0;
        },
      },
    };
  }
}
