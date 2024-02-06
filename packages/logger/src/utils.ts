import { idbLiteral } from './idb-literal';

export const download = function ({
  name,
  content,
  type = 'text/plain',
}: {
  name: string;
  content: string;
  type?: string;
}) {
  const a = document.createElement('a');
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  a.setAttribute('display', 'none');
  a.setAttribute('download', name);
  a.setAttribute('href', url);
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
};

export class WorkerScript {
  public script!: Blob;
  public url!: string;

  constructor(js: string) {
    this.script = new Blob(
      [
        idbLiteral,
        /* js */ `
      (async function main(globalThis){
          if (typeof WorkerGlobalScope !== 'undefined' && globalThis instanceof WorkerGlobalScope) {
            ${js}
          } else {
            throw new Error("The script can only be executed in the Web Worker runtime");
          }
        }
      )(globalThis)`,
      ],
      { type: 'text/javascript' },
    );

    this.url = globalThis.URL.createObjectURL(this.script);
  }
}
