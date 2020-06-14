const mix     = require('laravel-mix');
const webpack = require('webpack');
const path    = require("path");

class Package {

    name() {
        return 'package';
    }

    register(filesList, copyDirectory = false) {
        this.files  = filesList || '';
        this.copyTo = copyDirectory;
    }

    dependencies() {
        return ['fs-extra', 'cli-color', 'emojic'];
    }

    boot() {

        if (process.env.NODE_ENV === 'package') {
            if (!this.files) return;

            mix.then(() => {

                const cliColor = require("cli-color");
                const emojic   = require("emojic");
                const fsExtra  = require("fs-extra");
                const root     = Mix.paths.root();

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