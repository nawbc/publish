import type { TransportContent, TransportOptions } from '../transport';
import { Transport } from '../transport';
import { WorkerScript } from '../utils';

export interface IndexedDBTransportOptions extends TransportOptions {}

export class IndexedDBTransport extends Transport {
  constructor(options: IndexedDBTransportOptions) {
    console.log(options, '============');
    super(options);
  }

  /**
   * Main thread.
   * @param content
   */
  override async handle(content: TransportContent) {
    const worker = this.worker;
    console.log(content, worker, '-');
    worker.port.postMessage(content);
  }

  /**
   * Background thread
   */
  override background(options: TransportOptions) {
    const { namespace, storageVersion } = options;
    return new WorkerScript(/* js */ `
      const db = await idb.openDB('${namespace}', ${storageVersion}, {
        upgrade(db) {
          const store = db.createObjectStore('articles', {
            keyPath: 'id',
            autoIncrement: true,
          });
          store.createIndex('timestamp', 'timestamp');
        },
      });

      globalThis.addEventListener('connect', (e1)=>{
        const port = e1.ports[0]
        port.addEventListener('message', (e2)=>{
          console.log(e2.data)
        })
        port.start();
      })
    `);
  }

  override dispose() {
    super.dispose();
  }

  override grindStorage(): boolean | Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
