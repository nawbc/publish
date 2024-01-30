import { all, createLowlight } from 'lowlight';

export const registerProgramLanguages = function () {
  const lowlight = createLowlight();
  lowlight.register(all);

  return lowlight;
};
