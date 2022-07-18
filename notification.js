const mix  = require('laravel-mix');
const File = require('laravel-mix/src/File');

class Notifications {
    passive = true;

    name() {
        return 'notification';
    }

    boot() {
        mix.disableNotifications();
    }

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

    /**
     * webpack plugins to be appended to the master config.
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