(function () {
  'use strict';

  window.KA = window.KA || {};

  KA.getSession = function () {
    var sb = getSupabase();
    if (!sb) return null;
    try {
      return sb.auth.getSession();
    } catch (e) {
      return null;
    }
  };

  KA.currentUser = function () {
    var sb = getSupabase();
    if (!sb) return null;
    var session = sb.auth.getSession();
    if (session && session.data && session.data.session) {
      return session.data.session.user;
    }
    return null;
  };

  KA.signUp = async function (email, password, metadata) {
    var sb = getSupabase();
    if (!sb) return { error: { message: 'Supabase not configured. Click the ⚙ to set it up.' } };
    var result = await sb.auth.signUp({
      email: email,
      password: password,
      options: { data: metadata || {} }
    });
    return result;
  };

  KA.signIn = async function (email, password) {
    var sb = getSupabase();
    if (!sb) return { error: { message: 'Supabase not configured. Click the ⚙ to set it up.' } };
    var result = await sb.auth.signInWithPassword({
      email: email,
      password: password
    });
    return result;
  };

  KA.signOut = async function () {
    var sb = getSupabase();
    if (!sb) return;
    await sb.auth.signOut();
    window.location.href = 'index.html';
  };

  KA.getProfile = async function (userId) {
    var sb = getSupabase();
    if (!sb) return null;
    var uid = userId || (KA.currentUser() ? KA.currentUser().id : null);
    if (!uid) return null;
    var { data } = await sb.from('profiles').select('*').eq('id', uid).single();
    return data;
  };

  KA.updateProfile = async function (updates) {
    var sb = getSupabase();
    var user = KA.currentUser();
    if (!sb || !user) return { error: { message: 'Not logged in' } };
    var result = await sb.from('profiles').update(updates).eq('id', user.id);
    return result;
  };

  KA.applyAutofill = function () {
    var user = KA.currentUser();
    if (!user) return;
    KA.getProfile(user.id).then(function (profile) {
      if (!profile || !profile.autofill_enabled) return;
      var nameField = document.getElementById('victim-name');
      var conventionField = document.getElementById('victim-convention');
      var commentAuthorField = document.getElementById('comment-author');
      if (nameField && profile.display_name) {
        nameField.value = profile.display_name;
      }
      if (conventionField && profile.convention_history) {
        conventionField.value = profile.convention_history;
      }
      if (commentAuthorField && profile.display_name) {
        commentAuthorField.value = profile.display_name;
      }
    });
  };

  KA.getConfig = function () {
    return {
      url: localStorage.getItem('supabase-url') || '',
      key: localStorage.getItem('supabase-key') || ''
    };
  };

  KA.saveConfig = function (url, key) {
    localStorage.setItem('supabase-url', url);
    localStorage.setItem('supabase-key', key);
    localStorage.setItem('supabase-config', JSON.stringify({ url: url, key: key }));
    initSupabase(url, key);
  };

})();
