# Laravel Mix Extension for StorePress

`webpack.mix.js` Example
---

```js
const mix = require('laravel-mix');
const min = Mix.inProduction() ? '.min' : '';

require('laravel-mix-storepress');


mix.js(`src/js/scripts.js`, `assets/js/scripts${min}.js`);

// OS Notification
mix.notification('Notification Title', NOTIFICATION_ICON_PATH);

// File Banner
mix.banner('Banner Text for every js and css file');

// WP Translation
mix.translation('Package Title', 'text-domain');

// Some WP Tasks
mix.wp();
```

`package.json` Script
---
```
"scripts": {
    "webpack": "cross-env NODE_ENV=development node_modules/.bin/webpack --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
    "dev": "npm run webpack -- --watch",
    "build": "cross-env NODE_ENV=production node_modules/.bin/webpack --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
    "bundle": "npm run webpack && npm run build",
    "package:bundle": "cross-env NODE_ENV=package node_modules/.bin/webpack --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
    "package": "npm run bundle && npm run package:bundle"
}
```