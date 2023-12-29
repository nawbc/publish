import type { IDBPDatabase } from 'idb';
import { openDB } from 'idb';

import type { TransportContent, TransportOptions } from '../transport';
import { Transport } from '../transport';

export interface IndexedDBTransportOptions extends TransportOptions {}

export class IndexedDBTransport extends Transport {
  private _db!: IDBPDatabase<unknown>;

  constructor(options: IndexedDBTransportOptions) {
    super(options);
    openDB(options.namespace).then((db) => {
      this._db = db;
    });

    // options.namespace
  }

  override async write(content: TransportContent) {
    console.log(content);
  }

  override dispose() {
    this._db?.close();
  }

  override grindStorage(): boolean | Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
