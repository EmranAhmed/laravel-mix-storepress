const mix                   = require('laravel-mix');
const WebpackNotifierPlugin = require('webpack-notifier');

class Notifications {

    name() {
        return 'notification';
    }

    register(title = '', icon = Mix.paths.root('node_modules/laravel-mix-storepress/icons/wp.png'), always = true) {

        const PackageFile = JSON.parse(File.find(Mix.paths.root('package.json')).read());

        this.config = {
            title        : title || PackageFile.name.toUpperCase(),
            icon         : icon,
            alwaysNotify : always
        }
    }

    boot() {
        mix.disableNotifications();
    }

    webpackPlugins() {

        return new WebpackNotifierPlugin({
            title        : this.config.title,
            alwaysNotify : this.config.alwaysNotify,
            hint         :
                process.platform === 'linux'
                    ? 'int:transient:1'
                    : undefined,
            contentImage : this.config.icon
        });
    }

}

mix.extend('notification', new Notifications());