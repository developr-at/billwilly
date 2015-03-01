/*jslint node: true */
"use strict";

module.exports = function(grunt) {

    // Configurable paths for the application
    var appConfig = {
        doc: 'doc'
    };

    grunt.initConfig({

        // Project settings
        billwilly: appConfig,

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            doc: {
                src: [ '<%= billwilly.doc %>']
            }
        },

        jsdoc: {
            backend: {
                src: [
                    'controller/*.js',
                    'models/*.js',
                    'routes/*.js',
                ],
                options: {
                    destination: 'doc',
                    template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                    configure : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"
                }
            }
        },

        nodemon: {
            dev: {
                script: './bin/www',
                options: {
                    nodeArgs: ['--debug'],
                    ignore: ['node_modules/**']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('dev', [ 'nodemon' ]);

    grunt.registerTask('doc', [ 'clean:doc', 'jsdoc' ]);
};