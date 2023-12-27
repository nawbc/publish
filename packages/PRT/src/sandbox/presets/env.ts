interface PresetEnvScriptOptions {
  /**
   * Sandbox id.
   */
  id: string;
}

export const presetEnvScript = ({ id }: PresetEnvScriptOptions) => `
window.__SID__='${id}';
window.message = function(type, content){
  return {event: type, detail: content, __SID__: window.__SID__};
} 
window.addEventListener('error', (e) => {
  console.log(e, 'pppp')
  window.top.postMessage(window.message('error', e.error), '*');
});
`;
