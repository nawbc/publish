import type { HTMLAttributeReferrerPolicy } from 'react';
import * as uuid from 'uuid';

import { message } from './message';
import { presetEnvScript, serializeErrorScript } from './presets';

structuredClone;

export interface SandboxOptions {
  /**
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#sandbox}
   */
  grants: string[];
  /**
   *@see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#allow}
   */
  allows?: string[];
  /**
   * Part of iframe attributes.
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
   */
  iframe?: {
    referrerpolicy?: HTMLAttributeReferrerPolicy;
    allowfullscreen?: boolean;
    allowpaymentrequest?: boolean;
  };
}

export class Sandbox extends EventTarget {
  private _iframe!: HTMLIFrameElement;
  /**
   * Sandbox id, plugin can get it by `window.__SID__`
   */
  public id!: string;
  private _options: SandboxOptions;
  private _eventsSet = new Set<string>();

  constructor(options?: SandboxOptions) {
    super();
    this._options = Object.assign<object, SandboxOptions, SandboxOptions>(
      {},
      {
        grants: [
          'allow-popups',
          'allow-scripts',
          'allow-downloads',
          'allow-forms',
          'allow-modals',
          'allow-orientation-lock',
          'allow-pointer-lock',
        ],
      },
      options!,
    );
    this._init();
  }

  private _init() {
    this.id = uuid.v4();
    this._iframe = document.createElement('iframe');
    this._iframe.setAttribute('sandbox', this._options.grants.join(' '));
    this._iframe.setAttribute('allowfullscreen', 'true');
    this._iframe.setAttribute('id', this.id);
    this._iframe.style.display = 'none';

    document.body.appendChild(this._iframe);
  }

  public run(script: string) {
    const html = `<!DOCTYPE html>
<html>
<head></head>
<body>
  <script type='text/javascript'>
    ${serializeErrorScript}
  </script>
  <script type='text/javascript'>
    ${presetEnvScript({ id: this.id })}
  </script>
  <script>${script}</script>
</body>
</html>    
    `;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    this._iframe.src = url;
    this._iframe.addEventListener('load', this._handleLoad);
  }

  private _handleLoad = () => {
    const event = new CustomEvent('load');
    this.dispatchEvent(event);
  };

  public getInstance() {
    return document.getElementById(this.id) as HTMLIFrameElement;
  }

  /**
   * Built-in events `error`,`load`
   */
  public override addEventListener(
    type: string,
    callback: EventListenerOrEventListenerObject | null,
    options?: boolean | AddEventListenerOptions | undefined,
  ): void {
    this._eventsSet.add(type);

    window.addEventListener('message', (e) => {
      if (e.data) {
        try {
          const data = e.data;
          if (data.event === type) {
            this.dispatchEvent(new CustomEvent(type, { detail: data }));
          }
        } catch (error) {
          /* empty */
        }
      }
    });

    super.addEventListener(type, callback, options);
  }

  /**
   * Transferable objects
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects#supported_objects}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#supported_types}
   */
  public postMessage(
    type: string,
    content: unknown,
    options?: WindowPostMessageOptions,
  ) {
    options = Object.assign({}, { targetOrigin: '*' }, options);
    this._iframe.contentWindow?.postMessage(message(type, content), options);
  }

  public dispose() {
    this._iframe.parentNode?.removeChild(this._iframe);
    this.removeEventListener('error', null);
    this.removeEventListener('load', this._handleLoad);
    URL.revokeObjectURL(this._iframe.src);
  }
}
