const mix  = require('laravel-mix');
const File = require('laravel-mix/src/File');

class Notifications {
    passive = true;

    name() {
        return 'notification';
    }

    /**
     * Boot the component. This method is triggered after the
     * user's webpack.mix.js file has processed.
     */
    boot() {
        mix.disableNotifications();
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
     * @param  {string} title
     * @param  {string} icon
     * @param  {boolean} always
     * @return {void}
     *
     */
    register(title = '', icon = global.Mix.paths.root('node_modules/laravel-mix-storepress/icons/wp.png'), always = true) {

        const PackageFile = JSON.parse(File.find(global.Mix.paths.root('package.json')).read());

        this.config = {
            title        : title || PackageFile.name.toUpperCase(),
            contentImage : icon,
            alwaysNotify : always,
            timeout      : false,
            hint         : process.platform === 'linux' ? 'int:transient:1' : undefined,
        }
    }

    /*
     * Plugins to be merged with the underlying webpack plugins array.
     *
     * @return {Array|Object}
     */
    webpackPlugins() {

        if (process.env.DISABLE_NOTIFICATIONS === '1') {
            return [];
        }

        const WebpackNotifierPlugin = require('webpack-notifier');

        return new WebpackNotifierPlugin(this.config);
    }
};

mix.extend('notification', new Notifications());