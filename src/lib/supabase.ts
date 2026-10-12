import {createClient} from '@supabase/supabase-js';
const u=import.meta.env.VITE_SUPABASE_URL as string|undefined, k=import.meta.env.VITE_SUPABASE_ANON_KEY as string|undefined;
export const supabaseConfigured=!!(u&&k);
export const supabase=supabaseConfigured?createClient(u!,k!):null; // anon key uniquement; jamais de service_role ici
