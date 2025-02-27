import packageJson from './package.json' assert { type: 'json' };

/**
 * After changing, please reload the extension at `chrome://extensions`
 * @type {chrome.runtime.ManifestV3}
 */
const manifest = {
  manifest_version: 3,
  name: 'JSGuru Board',
  key:
    '-----BEGIN PUBLIC KEY-----\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAi6jjCQ0KYUk4/OGBaavy\n' +
    'ytS8gI0gdEnv5ItSst1Cw5PBr8iEX/czy/LM8RXMhM29Kr0ICkkwFJWfjxycmHQ0\n' +
    'b0tnBNEJAa7Fp1M0SrniQ6V087A1LoHKseCAGCJ0SbCvz3ZtP/xnIYlxBl35OExr\n' +
    '7tGjP4NLZX+BC2f2PX5Ojkfibc/5TUvJEaksA8hkAhDybABLURoVdS2PW20lT8W0\n' +
    'MTM4E1TeEFlBNvhi1I8ZG/Vm2mRPQFrehPovXUKLYnIp/kZkFApwXlkBag+pShqU\n' +
    '6N4Gpp0bJYjzD6aprX4Ui9QJ22fFpKPim9PhRFI0wtLMpJvMyWU9VvIsvRQOVAtI\n' +
    'gwIDAQAB\n' +
    '-----END PUBLIC KEY-----',
  version: packageJson.version,
  description: 'Feedback helper',
  permissions: ['storage', 'sidePanel', 'identity'],
  side_panel: {
    default_path: 'src/pages/sidepanel/index.html',
  },
  options_page: 'src/pages/options/index.html',
  background: {
    service_worker: 'src/pages/background/index.js',
    type: 'module',
  },
  action: {
    // default_popup: 'src/pages/popup/index.html',
    // default_icon: 'icon-34.png',
  },
  chrome_url_overrides: {
    newtab: 'src/pages/newtab/index.html',
  },
  icons: {
    128: 'icon-128.png',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      js: ['src/pages/content/index.js'],
      // KEY for cache invalidation
      css: ['assets/css/contentStyle<KEY>.chunk.css'],
    },
  ],
  devtools_page: 'src/pages/devtools/index.html',
  web_accessible_resources: [
    {
      resources: ['assets/js/*.js', 'assets/css/*.css', 'icon-128.png', 'icon-34.png'],
      matches: ['*://*/*'],
    },
  ],
  oauth2: {
    client_id: '546057772805-1opkesu3dl637cith33i7etj1ta45ug4.apps.googleusercontent.com',
    scopes: ['openid', 'email', 'profile'],
  },
};

export default manifest;
