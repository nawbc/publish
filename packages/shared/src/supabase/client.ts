import type { SupabaseClientOptions } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';

const options = {
  realtime: {
    log_level: 'info',
  },
} satisfies SupabaseClientOptions<'publish'>;

export const supabase = createClient(
  'https://ggkzmrclqoallhxjpwck.supabase.co',
  '',
  options,
);
