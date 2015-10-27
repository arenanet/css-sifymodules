"use strict";

var path = require("path"),
    through2 = require("through2"),
    FileSystemLoader = require("css-modules-loader-core/lib/file-system-loader"),
    Core = require("css-modules-loader-core"),
    fs = require("fs");

module.exports = function(browserify, options) {
    var settings = {},
        loader;
    options = options || {};

    settings.rootDir = path.resolve(options.rootDir || options.d || process.cwd());
    settings.cssOut = options.output || options.o;
    settings.plugins = options.use || options.u || Core.defaultPlugins;

    loader = new FileSystemLoader(settings.rootDir, settings.plugins);

    browserify.transform(function(filename) {
        if(path.extname(filename) !== ".css") {
            return through2();
        }

        return through2(function(chunk, enc, callback) {
            // do nothing
            callback();
        }, function(callback) {
            var self = this;
            loader
                .fetch(filename, settings.rootDir)
                .then(function(tokens) {
                    self.push("module.exports = " + JSON.stringify(tokens));
                    callback();
                });
        });
    }, { global : true });

    browserify.on("bundle", function(bundle) {
        bundle.on("end", function() {
            if(settings.cssOut) {
                fs.writeFile(
                    path.join(settings.rootDir, settings.cssOut),
                    loader.finalSource,
                    function(err) {
                        if(err) {
                            browserify.emit("error", err);
                        }
                    }
                );
            }
        });
    });
};
