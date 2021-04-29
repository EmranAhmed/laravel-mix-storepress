const mix                                 = require('laravel-mix')
const JavaScript                          = require('laravel-mix/src/components/JavaScript')
const WPDependencyExtractionWebpackPlugin = require('@wordpress/dependency-extraction-webpack-plugin')

/**
 * Laravel Mix WP Block
 *
 * @see https://laravel-mix.com/docs/5.0/extending-mix
 * @see https://www.npmjs.com/package/@wordpress/dependency-extraction-webpack-plugin
 */
class WPBlock extends JavaScript {

    name() {
        return 'wp_block'
    }

    dependencies() {
        this.requiresReload = `
      Dependencies have been installed. Please run again.
    `

        return [
            //'@wordpress/scripts',
            '@wordpress/babel-preset-default',
            '@wordpress/dependency-extraction-webpack-plugin',
        ]
    }

    register(entry, output, options = {}) {

        this.pluginOptions = (
            options.disableRegenerator === true ? {
                ...options,
                requestToExternal : function (request) {
                    if (request === '@babel/runtime/regenerator') {
                        return null
                    }
                },
            } : options
        )

        super.register(entry, output)
    }

    webpackConfig(webpackConfig) {

        // https://webpack.js.org/guides/build-performance/
        webpackConfig.output.pathinfo = false;

        /*webpackConfig.externals = {
            jquery     : 'jQuery', // var $ = require("jquery");
            wp         : 'wp',
            underscore : '_' // var _ = require("underscore");
        }*/

        // webpackConfig.resolve.alias['@'] = Mix.paths.root('src');
    }

    webpackPlugins() {

        return new WPDependencyExtractionWebpackPlugin({
            ...this.pluginOptions,
        });

    }

    babelConfig() {
        return {
            presets : ['@wordpress/babel-preset-default'],
        }
    }
}

mix.extend('wp_block', new WPBlock())