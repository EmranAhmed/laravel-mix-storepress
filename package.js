const mix     = require('laravel-mix');
const webpack = require('webpack');
const path    = require("path");

// const {DefinePlugin} = require("webpack");

class Package {

    name() {
        return 'package';
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
     * @param  {string} filesList
     * @param  {boolean} copyDirectory
     * @return {void}
     *
     */
    register(filesList, copyDirectory = false) {
        this.files  = filesList || '';
        this.copyTo = copyDirectory;
    }

    /**
     * All npm dependencies that should be installed by Mix.
     *
     * @return {Array}
     */
    dependencies() {
        return ['fs-extra', 'cli-color', 'emojic'];
    }
    /**
     * Boot the component. This method is triggered after the
     * user's webpack.mix.js file has processed.
     */
    boot() {

        if (process.env.PACKAGE && process.env.PACKAGE === 'yes') {
            if (!this.files) return;

            mix.then(() => {

                const cliColor = require("cli-color");
                const emojic   = require("emojic");
                const fsExtra  = require("fs-extra");
                const root     = global.Mix.paths.root();

                let bundledir = path.basename(root);
                let copyfrom  = path.resolve(root);
                let copyto    = this.copyTo || path.resolve(bundledir);
                let includes  = this.files.split("\n");

                fsExtra.ensureDir(copyto, function (err) {
                    if (err) return console.error(err)

                    includes.map(include => {

                        fsExtra.copy(`${copyfrom}/${include}`, `${copyto}/${include}`, function (err) {
                            if (err) return console.error(err);
                            console.log(cliColor.white(`=> ${emojic.smiley}  ${include} copied...`));
                        })
                    });

                    console.log(cliColor.white(`=> ${emojic.whiteCheckMark}  Build directory "${bundledir}" created`));
                })
            })
        }
    }
}

mix.extend('package', new Package());