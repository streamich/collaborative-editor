import type {StrApi} from 'json-joy/lib/json-crdt';
import type {JsonPatchStore} from 'json-joy/lib/json-crdt/json-patch/JsonPatchStore';
import type {ReplicatedStrFacade} from './types';

/** "strict" store does not expose JSON CRDT model directly. */
export type JsonPatchStoreStrict = Pick<JsonPatchStore<any>, 'getSnapshot' | 'subscribe' | 'update'>

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
  constructor(protected readonly store: JsonPatchStore<any> | JsonPatchStoreStrict, strict: boolean = false) {
    this.view = store.getSnapshot as unknown as ReplicatedStrFacade['view'];
    this.ins = (pos: number, str: string) => {
      store.update({op: 'str_ins', path: [], pos, str});
    };
    this.del = (pos: number, len: number) => {
      store.update({op: 'str_del', path: [], pos, len});
    };
    this.subscribe = store.subscribe;
    const str = strict ? void 0 : ((<JsonPatchStore<any>>store).api as StrApi)?.asStr?.();
    if (str) {
      this.findId = str.findId.bind(str);
      this.findPos = str.findPos.bind(str);
      this.transaction = str.api.transaction.bind(str.api);
      this.tick = () => str.api.model.tick;
    }
  }
}
