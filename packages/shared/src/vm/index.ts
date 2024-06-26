export const runScriptSafely = function (
  script: string,
  strict: boolean = false,
) {
  const fn = new Function(`${strict ? "'use strict';" : ''}  ${script}`)();

  return fn?.();
};
