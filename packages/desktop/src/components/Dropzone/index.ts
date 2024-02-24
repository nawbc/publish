import { Dropzone as _Dropzone } from './Dropzone';
import { DropzoneFullScreen } from './DropzoneFullScreen';

_Dropzone.FullScreen = DropzoneFullScreen;
export const Dropzone = _Dropzone;

export { DropzoneFullScreen };
export type {
  DropzoneCssVariables,
  DropzoneFactory,
  DropzoneProps,
  DropzoneStylesNames,
  DropzoneVariant,
} from './Dropzone';
export type {
  DropzoneFullScreenFactory,
  DropzoneFullScreenProps,
  DropzoneFullScreenStylesNames,
} from './DropzoneFullScreen';
export type {
  DropzoneAcceptProps,
  DropzoneIdleProps,
  DropzoneRejectProps,
} from './DropzoneStatus';
export { DropzoneAccept, DropzoneIdle, DropzoneReject } from './DropzoneStatus';
export * from './mime-types';
export type { FileRejection, FileWithPath } from 'react-dropzone-esm';
