import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx, ManifestV3Export, defineManifest } from '@crxjs/vite-plugin';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import path, { resolve } from 'path';

const isDev = process.env.__DEV__ === 'true';
const root = resolve(__dirname, 'src');
const pagesDir = resolve(root, 'pages');
const assetsDir = resolve(root, 'assets');
const outDir = resolve(__dirname, 'dist');
const publicDir = resolve(__dirname, 'public');

const viteManifestHackIssue846: Plugin & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderCrxManifest: (manifest: any, bundle: any) => void;
} = {
  // Workaround from https://github.com/crxjs/chrome-extension-tools/issues/846#issuecomment-1861880919.
  name: 'manifestHackIssue846',
  renderCrxManifest(_manifest, bundle) {
    bundle['manifest.json'] = bundle['.vite/manifest.json'];
    bundle['manifest.json'].fileName = 'manifest.json';
    delete bundle['.vite/manifest.json'];
  },
};
const manifestJs = defineManifest({
  manifest_version: 3,
  name: '__MSG_extName__',
  version: '1.0',
  default_locale: 'en',
  author: 'Jacob W.',
  homepage_url: 'https://jacobwi.io',
  action: {
    default_icon: {
      16: 'assets/logos/favicon-browser.png',
      48: 'assets/logos/favicon-browser.png',
      128: 'assets/logos/favicon-browser.png',
    },
    default_title: '__MSG_extName__',
    default_popup: 'src/pages/popup/index.html',
  },
  background: {
    service_worker: 'src/pages/background/index.ts',
    type: 'module',
  },
  content_security_policy: {
    extension_pages:
      "script-src 'self'; object-src 'self'; style-src 'self' 'unsafe-inline'",
  },
  content_scripts: [
    {
      matches: ['https://*/*', 'http://*/*'],
      js: ['src/pages/content/index.tsx'],
      run_at: 'document_start',
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        'assets/js/*.js',
        'assets/css/*.css',
        'assets/logos/favicon-browser.png',
        'assets/logos/favicon-android.png',
        'assets/logos/favicon-iphone.png',
      ],
      matches: ['*://*/*'],
    },
  ],
  icons: {
    16: 'assets/logos/favicon-browser.png',
    48: 'assets/logos/favicon-browser.png',
    128: 'assets/logos/favicon-browser.png',
  },
  permissions: [
    'tabs',
    'activeTab',
    'bookmarks',
    'contextMenus',
    'storage',
    'unlimitedStorage',
    'clipboardRead',
    'clipboardWrite',
    'idle',
    'alarms',
    'scripting',
    'offscreen',
  ],
  host_permissions: ['http://*/*', 'https://*/*'],
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteManifestHackIssue846,
    crx({
      manifest: manifestJs as ManifestV3Export,
      contentScripts: {
        injectCss: true,
      },
    }),
    viteStaticCopy({
      targets: [
        { src: 'src/_locales/*', dest: '_locales' }, // Adjust the source path as needed
      ],
    }),
  ],
  publicDir,
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared/src'),
      '@src': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    },
  },
  build: {
    outDir: outDir,
    sourcemap: isDev,
    emptyOutDir: !isDev,
    manifest: true,
  },
  server: {
    port: 3000, // Explicitly set the port
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
  },
});
