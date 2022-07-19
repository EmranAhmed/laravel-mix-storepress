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
    "laravel-mix-storepress": "^0.0.4"
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

Full API
---
```js
// Full API
// https://laravel-mix.com/docs/6.0/api

// mix.alias({
//     '@': path.join(__dirname, 'resources/js')
// });

// mix.js(src, output);

// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.

// mix.preact(src, output); <-- Identical to mix.js(), but registers Preact compilation.

// mix.coffee(src, output); <-- Identical to mix.js(), but registers CoffeeScript compilation.

// mix.ts(src, output); <-- TypeScript support. Requires tsconfig.json to exist in the same folder as webpack.mix.js

// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.test');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({
//     jquery: ['$', 'window.jQuery']
// }); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.babelConfig({}); <-- Merge extra Babel configuration (plugins, etc.) with Mix's default.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.dump(); <-- Dump the generated webpack config object to the console.
// mix.extend(name, handler) <-- Extend Mix's API with your own components.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   globalVueStyles: file, // Variables file to be imported in every component.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   terser: {}, // Terser-specific options. https://github.com/webpack-contrib/terser-webpack-plugin#options
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
```