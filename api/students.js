import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  const { data } = await supabase.from('students')
    .select('*').order('points', { ascending: false });

  res.status(200).json(data || []);
}