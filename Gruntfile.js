/*jslint node: true */
"use strict";

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    targetDir: 'public/libs',
                    cleanTargetDir: true
                }
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                files: {
                    'libs/libraries.js': [
                        "libs/angular/angular.js",
                        "libs/angular-messages/angular-messages.js",
                        "libs/angular-ui-router/release/angular-ui-router.js",
                        "libs/angular-google-chart/ng-google-chart.js",
                        "libs/angular-smart-table/dist/smart-table.min.js",
                        "libs/jquery/dist/jquery.js",
                        "libs/bootstrap/dist/js/bootstrap.js"
                    ],

                    'public/javascripts/dist/main.js': [ 'public/javascripts/angularApp.js', 'public/javascripts/angular-core.js', 'public/javascripts/app.controller.js' ],
                    'public/javascripts/dist/modules.js': [ 'public/javascripts/components/**/*.module.js' ],
                    'public/javascripts/dist/controllers.js': [ 'public/javascripts/components/**/*.controller.js' ],
                    'public/javascripts/dist/services.js': [ 'public/javascripts/components/**/*.service.js' ],
                    'public/javascripts/dist/directives.js': [ 'public/javascripts/components/**/*.directive.js' ]
                }
            }
        },

        jshint: {
            all: [ 'Gruntfile.js', 'public/javascripts/*.js', 'public/javascripts/**/*.js' ]
        },

        watch: {
            dev: {
                files: [ 'Gruntfile.js', 'public/javascripts/**/*.js', '!public/javascripts/dist/*.js', '*.html' ],
                tasks: [ 'jshint', 'concat:dist' ],
                options: {
                    atBegin: true
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
                    ignore: ['node_modules/**', 'public/**']
                }
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },

            tasks: ['shell', 'nodemon', 'watch']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell-spawn');

    grunt.registerTask('dev', [ 'bower', 'concurrent' ]);
};