interface PresetEnvScriptOptions {
  /**
   * Sandbox id.
   */
  id: string;
}

export const presetEnvScript = ({ id }: PresetEnvScriptOptions) => /*js*/ `
window.__SID__='${id}';
window.message = function(type, content){
  return {event: type, detail: content, __SID__: window.__SID__};
} 
window.addEventListener('error', (e) => {
  window.top.postMessage(window.message('error', e.error), '*');
});
`;
