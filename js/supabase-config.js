var SUPABASE_URL = 'https://xdffdxzqyzufsfxwrrmj.supabase.co';
var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkZmZkeHpxeXp1ZnNmeHdycm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxNTkyNzMsImV4cCI6MjA5NDczNTI3M30.3x1luCitu0EhIjJQP31-yduU8SwU9ARtc5cbKAmw9sA';

var supabaseClient = null;

function initSupabase(url, key) {
  SUPABASE_URL = url || localStorage.getItem('supabase-url') || SUPABASE_URL;
  SUPABASE_ANON_KEY = key || localStorage.getItem('supabase-key') || SUPABASE_ANON_KEY;

  if (SUPABASE_URL && SUPABASE_ANON_KEY && typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false
      }
    });
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
