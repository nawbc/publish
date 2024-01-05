import type { Resource } from 'i18next';

import en from './en';
import zhCN from './zh-CN';

export const resources = {
  'zh-CN': {
    translation: zhCN,
  },
  en: {
    translation: en,
  },
} satisfies Resource;
