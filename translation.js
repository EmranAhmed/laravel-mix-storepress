const mix         = require('laravel-mix');
const File        = require('laravel-mix/src/File');
const PackageFile = JSON.parse(File.find(Mix.paths.root('package.json')).read());

class Translation {

    name() {
        return 'translation';
    }

    dependencies() {
        //return ['wp-pot', 'laravel-mix-serve'];
        return ['wp-pot', 'cross-env'];
    }

    register(title = PackageFile.name.toUpperCase(), textDomain = PackageFile.name.toLowerCase()) {

        this.config = {
            package   : title,
            bugReport : '',
            team      : PackageFile.author,
            src       : '**/*.php',
            domain    : textDomain,
            destFile  : `languages/${textDomain}.pot`
        }
    }

    boot() {
        if (global.Mix.inProduction()) {

            /* mix.serve('wp i18n make-pot . --domain=text-domain', {
                 verbose: false,
                 watch: false,
                 dev: false,
                 prod: true
             });*/

            const wpPot = require('wp-pot');
            wpPot(this.config);
        }
    }
}

mix.extend('translation', new Translation());