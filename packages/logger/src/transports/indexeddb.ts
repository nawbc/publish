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
  override background() {
    return new WorkerScript(/* js */ `
      const request = globalThis.indexedDB.open("log");
      globalThis.addEventListener('connect', (e1)=>{
        const port = e1.ports[0]
        port.start();
        port.addEventListener('message', (e2)=>{
          console.log(e2.data)
        })
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
