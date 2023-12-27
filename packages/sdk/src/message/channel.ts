import { message } from './message';

function addEventListener(type: string, callback: EventListener | null) {
  window.addEventListener('message', (event) => {
    if (event.data) {
      const data = event.data;
      if (data.event === type && callback) {
        callback(new CustomEvent(type, { detail: data.detail }));
      }
    }
  });
}

/**
 * Transferable objects
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects#supported_objects}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#supported_types}
 */
function postMessage(
  type: string,
  content: unknown,
  options?: WindowPostMessageOptions,
) {
  if (window.top) {
    options = Object.assign({}, { targetOrigin: '*' }, options);
    window.top.postMessage(message(type, content), options);
  } else {
    throw new Error('Can not send message');
  }
}

export const channel = { addEventListener, postMessage };
