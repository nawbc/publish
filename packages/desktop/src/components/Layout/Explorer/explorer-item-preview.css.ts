import { style } from '@vanilla-extract/css';

export const main = style({
  alignItems: 'flex-start',
  backgroundColor: '#1967d2',
  borderRadius: '4px',
  boxShadow:
    '0 12px 24px -6px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.08)',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  padding: '8px',
});

export const item = style({
  alignItems: 'center',
  color: '#fff',
  display: 'inline-grid',
  fontSize: '14px',
  gap: '8px',
  gridTemplateColumns: 'auto auto',
});

export const icon = style({
  alignItems: 'center',
  display: 'flex',
});

export const label = style({
  alignItems: 'center',
  display: 'flex',
});

export const badge = style({
  border: 'solid 2px #fff',
});
