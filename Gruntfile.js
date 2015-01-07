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
                    'public/libs/libraries.js': [
                        "public/libs/angular/angular.js",
                        "public/libs/angular-cookies/angular-cookies.js",
                        "public/libs/angular-messages/angular-messages.js",
                        "public/libs/angular-ui-router/release/angular-ui-router.js",
                        "public/libs/angular-google-chart/ng-google-chart.js",
                        "public/libs/angular-smart-table/dist/smart-table.min.js",
                        "public/libs/jquery/dist/jquery.js",
                        "public/libs/bootstrap/dist/js/bootstrap.js"
                    ],

                    'public/javascripts/dist/main.js': [ 'public/javascripts/angularApp.js', 'public/javascripts/angular-core.js', 'public/javascripts/app.controller.js' ],
                    'public/javascripts/dist/modules.js': [ 'public/javascripts/components/**/*.module.js' ],
                    'public/javascripts/dist/controllers.js': [ 'public/javascripts/components/**/*.controller.js' ],
                    'public/javascripts/dist/services.js': [ 'public/javascripts/components/**/*.service.js' ],
                    'public/javascripts/dist/directives.js': [ 'public/javascripts/components/**/*.directive.js' ]
                }
            }
        },

        less: {
            dev: {
                files: {
                    'public/stylesheets/app.css': 'assets/stylesheets/app.less'
                }
            }
        },

        jshint: {
            all: [ 'Gruntfile.js', 'public/javascripts/*.js', 'public/javascripts/**/*.js' ]
        },

        jsdoc: {
            frontend: {
                src: [ 'public/javascripts/components/**/*.js' ],
                options: {
                    destination: 'doc/frontend',
                    template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
                    configure : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"
                }
            },

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

        watch: {
            dev: {
                files: [ 'Gruntfile.js', 'public/javascripts/**/*.js', '!public/javascripts/dist/*.js', '*.html' ],
                tasks: [ 'jshint', 'concat:dist' ],
                options: {
                    atBegin: true
                }
            },

            css: {
                files: [ 'assets/stylesheets/*.less' ],
                tasks: [ 'less:dev' ],
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

            tasks: ['shell', 'nodemon', 'watch:css', 'watch:dev']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('dev', [ 'bower', 'concurrent' ]);
};