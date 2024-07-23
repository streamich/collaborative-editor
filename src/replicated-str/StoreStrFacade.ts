import type {StrApi} from 'json-joy/lib/json-crdt';
import type {JsonPatchStore} from 'json-joy/lib/json-crdt/json-patch/JsonPatchStore';
import type {ReplicatedStrFacade} from './types';

export class StoreStrFacade implements ReplicatedStrFacade {
  public readonly view: ReplicatedStrFacade['view'];
  public readonly ins: ReplicatedStrFacade['ins'];
  public readonly del: ReplicatedStrFacade['del'];
  public readonly subscribe: ReplicatedStrFacade['subscribe'];
  public readonly findId: ReplicatedStrFacade['findId'];
  public readonly findPos: ReplicatedStrFacade['findPos'];
  public readonly transaction: ReplicatedStrFacade['transaction'];
  public readonly tick: ReplicatedStrFacade['tick'];

  /**
   * @param store JsonPatchStore instance which wraps a "str" node.
   */
  constructor(protected readonly store: JsonPatchStore<any>) {
    this.view = store.getSnapshot as unknown as ReplicatedStrFacade['view'];
    this.ins = (pos: number, str: string) => {
      store.update({op: 'str_ins', path: [], pos, str});
    };
    this.del = (pos: number, len: number) => {
      store.update({op: 'str_del', path: [], pos, len});
    };
    const str = (store.api as StrApi).asStr();
    this.subscribe = str.api.onChange.listen.bind(str.api.onChange);
    this.findId = str.findId.bind(str);
    this.findPos = str.findPos.bind(str);
    this.transaction = str.api.transaction.bind(str.api);
    this.tick = () => str.api.model.tick;
  }
}
