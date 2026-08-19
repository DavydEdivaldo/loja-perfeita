import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://buklkinofnzajdckqmbz.supabase.co'
const supabaseKey = 'sb_publishable_PUp38D099klcO4lv2_dSag_W1h7OTkb'

export const supabase = createClient(supabaseUrl, supabaseKey);