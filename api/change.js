import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const { id, delta } = req.query;
  if (!id || !delta) return res.status(400).send('参数错误');

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  const { data: cur } = await supabase.from('students')
    .select('points').eq('id', id).single();

  await supabase.from('students')
    .update({ points: cur.points + Number(delta) }).eq('id', id);

  res.status(200).send('ok');
}