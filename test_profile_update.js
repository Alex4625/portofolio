const fs = require('fs');
const env = fs.readFileSync('.dev.vars', 'utf8').split('\n').reduce((acc, line) => {
  const [key, ...val] = line.split('=');
  if (key && val.length) acc[key.trim()] = val.join('=').trim();
  return acc;
}, {});

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

async function testUpdate() {
  const { data: existingProfile, error: selectErr } = await supabase.from('profiles').select('id').limit(1).single();
  if (selectErr) console.log('Select error:', selectErr.message);
  
  if (existingProfile) {
    console.log('Updating profile', existingProfile.id);
    const { error } = await supabase.from('profiles').update({ updated_at: new Date().toISOString() }).eq('id', existingProfile.id);
    if (error) console.error('Update error:', error);
    else console.log('Update success');
  } else {
    console.log('Inserting profile');
    const { error } = await supabase.from('profiles').insert({ full_name: 'Testing' });
    if (error) console.error('Insert error:', error);
    else console.log('Insert success');
  }
}
testUpdate();
