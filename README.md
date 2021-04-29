# Laravel Mix Extension for StorePress

`webpack.mix.js` Example
---

```js
const mix = require('laravel-mix');
const min = Mix.inProduction() ? '.min' : '';

require('laravel-mix-storepress');

mix.js(`src/js/scripts.js`, `assets/js/scripts${min}.js`);

// OS Notification
mix.notification('Notification Title', 'NOTIFICATION_ICON_PATH');  // Example: Mix.paths.root('images/icon.png')

// File Banner
mix.banner('Banner Text for every js and css file');

// WP Translation
mix.translation('Package Title', 'text-domain');

// Some WP Tasks
mix.wp();

// Create Gutenberg Block
mix.wp_block(`src/blocks/scripts.block.js`, `assets/blocks/scripts${min}.js`, {
    injectPolyfill : true,
    requestToExternal: function (request) {
        
        // To exclude JS file extraction
        if (request.includes('src/js')) {
            return undefined;
        }
    }
});

// Create Package
mix.package('File/Directory List with new line'); // Will run on: npm run package
```

Gutenberg Block 
---

Recommended to use `.block.js` file name for gutenberg block.

By doing so you'll find that you can now utilize all `@wordpress` scoped dependencies using ECMAScript 6 import syntax. Example:
```js
import { RichText } from '@wordpress/block-editor'
```
These packages are included as [webpack externals](https://webpack.js.org/configuration/externals/), so there is no reason to add them to your package file.

You will also find a php manifest file accompanying each script in your distribution directory. This file declares an array of dependencies based on what you've used in your scripts. Require it and you're set.

Additional [Dependency Extraction Webpack Plugin options](https://www.npmjs.com/package/@wordpress/dependency-extraction-webpack-plugin#options) maybe be provided as a third argument to `mix.wp_block()`:

```js
mix.block('resources/assets/scripts/blocks.js', 'scripts', {
  outputFormat: 'json',
})
```

Besides the plugin options there is a special flag for the common use case of turning off `@babel/runtime/regenerator` handling by `wp-polyfill`.

```js
mix.block('resources/assets/scripts/blocks.js', 'scripts', {
  disableRegenerator: true,
})
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