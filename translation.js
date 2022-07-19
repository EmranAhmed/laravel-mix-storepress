const mix         = require('laravel-mix');
const File        = require('laravel-mix/src/File');
const PackageFile = JSON.parse(File.find(global.Mix.paths.root('package.json')).read());
const fs          = require('fs');

class Translation {

    name() {
        return 'translation';
    }

    /**
     * All npm dependencies that should be installed by Mix.
     *
     * @return {Array}
     */
    dependencies() {
        // return ['wp-pot', 'laravel-mix-serve'];
        return ['wp-pot', 'cross-env'];
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
     * @param  {string} textDomain
     * @return {void}
     *
     */
    register(title = PackageFile.name.toUpperCase(), textDomain = PackageFile.name.toLowerCase()) {

        const hasLanguageDirectory = File.exists(global.Mix.paths.root('languages'));

        if (!hasLanguageDirectory) {
            fs.mkdirSync(global.Mix.paths.root('languages'), {mode : 0o777});
        }

        this.config = {
            package   : title,
            bugReport : '',
            team      : PackageFile.author,
            src       : '**/*.php',
            domain    : textDomain,
            destFile  : `languages/${textDomain}.pot`
        }
    }

    /**
     * Boot the component. This method is triggered after the
     * user's webpack.mix.js file has processed.
     */
    boot() {
        if (global.Mix.inProduction()) {
            const wpPot = require('wp-pot');
            wpPot(this.config);
        }
    }
}

mix.extend('translation', new Translation());