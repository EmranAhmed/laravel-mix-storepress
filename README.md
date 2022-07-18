# Laravel Mix Extension for StorePress

`webpack.mix.js` Example
---

```js
const mix = require('laravel-mix');
const min = mix.inProduction() ? '.min' : '';

require('laravel-mix-storepress');

mix.js(`src/js/scripts.js`, `assets/js/scripts${min}.js`);

// OS Notification
mix.notification('Notification Title', 'NOTIFICATION_ICON_PATH');  // Example: global.Mix.paths.root('images/icon.png')

// File Banner
mix.banner('Banner Text for every js and css file');

// WP Translation
mix.translation('Package Title', 'text-domain');

// Some WP Tasks
mix.wp();

// Create Package
mix.package('File/Directory List with new line'); // Will run on: npm run package
```

`package.json` Script
---
```
  "devDependencies" : {
    "laravel-mix" : "^6.0.49",
  },
  "scripts" : {
    "development" : "mix",
    "production" : "mix --production",
    "dev" : "mix watch",
    "build" : "npm run development && npm run production",
    "package" : "npm run build && cross-env PACKAGE=yes node_modules/.bin/webpack --progress --config=node_modules/laravel-mix/setup/webpack.config.js"
  },
   "engines" : {
    "node" : "^16.16.0",
    "npm" : "^8.11.0"
  }
```