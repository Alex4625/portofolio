const { createClient } = require('@supabase/supabase-js');

const base = 'sb_secret_ZrK#W5ZGctBdFLpAQHcC@g_^&PAwsRB';
const p1 = ['1', 'l', 'I'];
const p2 = ['1', 'l', 'I'];
const p3 = ['L', 'l', '1', 'I'];
const p4 = ['L', 'l', '1', 'I'];

async function testKeys() {
  for (const a of p1) {
    for (const b of p2) {
      for (const c of p3) {
        for (const d of p4) {
          const key = base.replace('#', a).replace('@', b).replace('^', c).replace('&', d);
          const supabase = createClient('https://rfraszmvorpyrlpqidka.supabase.co', key);
          try {
            const { error } = await supabase.from('profiles').select('id').limit(1);
            if (!error || error.code !== 'PGRST301') {
              console.log('Found valid key:', key);
              return;
            }
          } catch(e) {}
        }
      }
    }
  }
}
testKeys();
