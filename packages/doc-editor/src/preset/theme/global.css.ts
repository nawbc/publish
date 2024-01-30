import { globalStyle } from '@vanilla-extract/css';

globalStyle('.tiptap .is-empty::before ', {
  color: '#adb5bd',
  content: 'attr(data-placeholder)',
  float: 'left',
  height: 0,
  pointerEvents: 'none',
});
