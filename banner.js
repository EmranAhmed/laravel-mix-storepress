const mix     = require('laravel-mix');
const webpack = require('webpack');

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
        if (!Mix.inProduction()) {
            return new webpack.BannerPlugin(this.config)
        }
    }

}

mix.extend('banner', new Banner());