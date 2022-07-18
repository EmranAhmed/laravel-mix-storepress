const mix     = require('laravel-mix');

class Banner {

    name() {
        return 'banner';
    }

    register(banner = '') {

        this.config = {
            banner    : banner || "name:[name], file:[file]",
            raw       : false,
            entryOnly : true
        }
    }

    webpackPlugins() {
        if (!mix.inProduction()) {
            const webpack = require('webpack');
            return new webpack.BannerPlugin(this.config)
        }
    }

}

mix.extend('banner', new Banner());