(function () {
  'use strict';

  window.KA = window.KA || {};

  KA.currentUser = async function () {
    var sb = getSupabase();
    if (!sb) return null;
    try {
      var { data } = await sb.auth.getUser();
      return data ? data.user : null;
    } catch (e) {
      return null;
    }
  };

  KA.signUp = async function (email, password, metadata) {
    var sb = getSupabase();
    if (!sb) return { error: { message: 'Supabase not configured.' } };
    return await sb.auth.signUp({
      email: email,
      password: password,
      options: { data: metadata || {} }
    });
  };

  KA.signIn = async function (email, password) {
    var sb = getSupabase();
    if (!sb) return { error: { message: 'Supabase not configured.' } };
    return await sb.auth.signInWithPassword({ email: email, password: password });
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
    var uid = userId;
    if (!uid) {
      var user = await KA.currentUser();
      uid = user ? user.id : null;
    }
    if (!uid) return null;
    var { data } = await sb.from('profiles').select('*').eq('id', uid).single();
    return data;
  };

  KA.updateProfile = async function (updates) {
    var sb = getSupabase();
    var user = await KA.currentUser();
    if (!sb || !user) return { error: { message: 'Not logged in' } };
    return await sb.from('profiles').update(updates).eq('id', user.id);
  };

  KA.applyAutofill = async function () {
    var user = await KA.currentUser();
    if (!user) return;
    var profile = await KA.getProfile(user.id);
    if (!profile || !profile.autofill_enabled) return;
    var nameField = document.getElementById('victim-name');
    var conventionField = document.getElementById('victim-convention');
    var commentAuthorField = document.getElementById('comment-author');
    if (nameField && profile.display_name) nameField.value = profile.display_name;
    if (conventionField && profile.convention_history) conventionField.value = profile.convention_history;
    if (commentAuthorField && profile.display_name) commentAuthorField.value = profile.display_name;
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
    initSupabase(url, key);
  };

})();
