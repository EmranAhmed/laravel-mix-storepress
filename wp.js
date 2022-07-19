const mix = require('laravel-mix');

class WP {

    name() {
        return 'wp';
    }

    /**
     * All npm dependencies that should be installed by Mix.
     *
     * @return {Array}
     */
    dependencies() {
        return ['@babel/preset-env', '@babel/plugin-syntax-dynamic-import', 'exports-loader', 'babel-plugin-dynamic-import-node', '@svgr/webpack'];
    }

    /**
     * Register the component.
     *
     * When your component is called, all user parameters
     * will be passed to this method.
     *
     * Ex: register(src, output) {}
     * Ex: mix.yourPlugin('src/path', 'output/path');
     *
     * @return {void}
     *
     */
    register() {
        this.autoprefixerConfig = {
            overrideBrowserslist : ['last 4 versions', '> 1%'],
            grid                 : 'autoplace' // FOR IE10 add custom or false by mix.options({ autoprefixer:{ grid: false } })
        }
    }

    /**
     * Boot the component. This method is triggered after the
     * user's webpack.mix.js file has processed.
     */

    boot() {
        global.Config.processCssUrls = false;
        global.Config.autoprefixer   = Object.assign(this.autoprefixerConfig, global.Config.autoprefixer);
    }

    /**
     * Override the underlying webpack configuration.
     *
     * @param  {Object} webpackConfig
     * @return {void}
     */
    webpackConfig(webpackConfig) {

        // https://webpack.js.org/guides/build-performance/
        webpackConfig.output.pathinfo = false;

        // webpackConfig.stats.children = true

        // webpack will generate a runtime code for web platform and will use only ES5 features.
        webpackConfig.target = ['web', 'es5'];

        webpackConfig.externals = {
            jquery     : 'jQuery', // var $ = require("jquery");
            wp         : 'wp',
            underscore : '_' // var _ = require("underscore");
        }
    }

    /**
     * Rules to be merged with the underlying webpack rules.
     *
     * @return {Array|Object}
     */
    webpackRules() {

        // Example:
        return {
            test : /\.svg$/,
            use  : ['@svgr/webpack', 'url-loader'],
        };
    }

    /**
     * Babel config to be merged with Mix's defaults.
     *
     * @return {Object}
     */
    babelConfig() {
        return {
            plugins : ['dynamic-import-node'],
            presets : ["@babel/preset-env"],
        };
    }
}

mix.extend('wp', new WP());