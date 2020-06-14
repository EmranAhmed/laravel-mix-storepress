const mix         = require('laravel-mix');
const PackageFile = JSON.parse(File.find(Mix.paths.root('package.json')).read());

class Translation {

    name() {
        return 'translation';
    }

    dependencies() {
        return ['wp-pot'];
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
        if (Mix.inProduction()) {
            const wpPot = require('wp-pot');
            wpPot(this.config);
        }
    }
}

mix.extend('translation', new Translation());