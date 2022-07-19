const mix = require('laravel-mix');

class Banner {

    name() {
        return 'banner';
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
     * @param  {string} banner
     * @return {void}
     *
     */
    register(banner = '') {

        this.config = {
            banner    : banner || "name:[name], file:[file]",
            raw       : false,
            entryOnly : true
        }
    }

    /*
     * Plugins to be merged with the underlying webpack plugins array.
     *
     * @return {Array|Object}
     */
    webpackPlugins() {
        if (!mix.inProduction()) {
            const webpack = require('webpack');
            return new webpack.BannerPlugin(this.config)
        }
    }

}

mix.extend('banner', new Banner());