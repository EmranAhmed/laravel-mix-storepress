const mix     = require('laravel-mix');
const webpack = require('webpack');

class WP {

    name() {
        return 'wp';
    }

    register(webpackConfig) {

    }

    dependencies() {
        return ['@babel/preset-env', 'exports-loader', 'babel-plugin-dynamic-import-node', '@svgr/webpack'];
    }

    boot() {
        Config.processCssUrls       = false;
        Config.autoprefixer.options = {
            // browsers : ['last 3 versions', '> 1%']
            // https://github.com/postcss/autoprefixer#webpack
            overrideBrowserslist : ['last 3 versions', '> 1%'],
            grid                 : 'autoplace' // FOR IE10
        }

        //mix.setPublicPath('./assets/js');
    }

    webpackPlugins() {
        /*return [
            new webpack.ProvidePlugin({
                $               : 'jquery',
                jQuery          : 'jquery',
                'window.jQuery' : 'jquery',
                // Popper: ['popper.js', 'default'],
                // In case you imported plugins individually, you must also require them here:
                // Util: "exports-loader?Util!bootstrap/js/dist/util",
                // Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            })
        ];*/
    }

    webpackConfig(webpackConfig) {

        // https://webpack.js.org/guides/build-performance/
        webpackConfig.output.pathinfo = false;
        //  console.log(webpackConfig);

        /*webpackConfig.externals = {
            jquery     : 'jQuery', // var $ = require("jquery");
            wp         : 'wp',
            underscore : '_' // var _ = require("underscore");
        }*/

        // webpackConfig.resolve.alias['@'] = Mix.paths.root('src');
    }

    babelConfig() {
        return {
            plugins : ['dynamic-import-node'],
            presets : ["@babel/preset-env"],
        };
    }

    webpackRules() {

        // Example:
         return {
             test: /\.svg$/,
             use: [ '@svgr/webpack', 'url-loader' ],
         };
    }
}

mix.extend('wp', new WP());