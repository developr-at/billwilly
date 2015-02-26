/*jslint node: true */
"use strict";

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jsdoc: {

            backend: {
                src: [
                    'controller/*.js',
                    'models/*.js',
                    'routes/*.js',
                ],
                options: {
                    destination: 'doc/backend',
                    template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                    configure : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"
                }
            }
        },

        shell: {
            mongodb: {
                command: 'mongod --dbpath ./data/db/billwilly',
                options: {
                    async: true,
                    stdout: false,
                    stderr: true,
                    failOnError: true,
                    execOptions: {
                        cwd: '.'
                    }
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
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },

            tasks: ['shell', 'nodemon']
        }
    });

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('dev', [ 'concurrent' ]);
};