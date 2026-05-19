var SUPABASE_URL = '';
var SUPABASE_ANON_KEY = '';

var supabaseClient = null;

function initSupabase(url, key) {
  SUPABASE_URL = url || localStorage.getItem('supabase-url') || '';
  SUPABASE_ANON_KEY = key || localStorage.getItem('supabase-key') || '';

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    var stored = localStorage.getItem('supabase-config');
    if (stored) {
      try {
        var c = JSON.parse(stored);
        SUPABASE_URL = c.url;
        SUPABASE_ANON_KEY = c.key;
      } catch (e) {}
    }
  }

  if (SUPABASE_URL && SUPABASE_ANON_KEY && typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    return true;
  }
  return false;
}

function getSupabase() {
  if (!supabaseClient) {
    initSupabase();
  }
  return supabaseClient;
}
