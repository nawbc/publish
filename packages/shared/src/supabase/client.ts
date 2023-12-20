import { SupabaseClientOptions, createClient } from '@supabase/supabase-js';

const options = {
  realtime: {
    log_level: 'info',
  },
} satisfies SupabaseClientOptions<'publish'>;

const supabase = createClient(
  'https://ggkzmrclqoallhxjpwck.supabase.co',
  '',
  options,
);
