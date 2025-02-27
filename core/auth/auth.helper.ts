export const getGoogleSignUrl = (client_id: string): URL => {
  const url = new URL('https://accounts.google.com/o/oauth2/auth');
  url.searchParams.set('client_id', client_id);
  url.searchParams.set('response_type', 'id_token token');
  url.searchParams.set('access_type', 'online');
  url.searchParams.set('redirect_uri', `https://${chrome.runtime.id}.chromiumapp.org`);
  url.searchParams.set('scope', 'openid profile email');
  return url;
};
