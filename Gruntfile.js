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
                    targetDir: 'assets/javascripts/libs/',
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
                    'public/javascripts/libraries.js': [
                        "assets/javascripts/libs/angular/angular.js",
                        "assets/javascripts/libs/angular-cookies/angular-cookies.js",
                        "assets/javascripts/libs/angular-messages/angular-messages.js",
                        "assets/javascripts/libs/angular-ui-router/release/angular-ui-router.js",
                        "assets/javascripts/libs/angular-google-chart/ng-google-chart.js",
                        "assets/javascripts/libs/angular-smart-table/dist/smart-table.min.js",
                        "assets/javascripts/libs/jquery/dist/jquery.js",
                        "assets/javascripts/libs/bootstrap/dist/js/bootstrap.js"
                    ],

                    'public/javascripts/main.js': [ 'assets/javascripts/angularApp.js', 'assets/javascripts/angular-core.js' ],
                    'public/javascripts/modules.js': [ 'assets/javascripts/components/**/*.module.js' ],
                    'public/javascripts/controllers.js': [ 'assets/javascripts/components/**/*.controller.js' ],
                    'public/javascripts/services.js': [ 'assets/javascripts/components/**/*.service.js' ],
                    'public/javascripts/directives.js': [ 'assets/javascripts/components/**/*.directive.js' ]
                }
            }
        },

        copy: {
            libs: {
                cwd: 'assets/javascripts/libs/bootstrap/dist',
                src: '**/*',
                dest: 'public/libs/bootstrap',
                expand: true
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
            all: [ 'Gruntfile.js', 'assets/javascripts/*.js', 'assets/javascripts/components/**/*.js', '!assets/javascripts/libs/**/*.js' ]
        },

        jsdoc: {
            frontend: {
                src: [ 'assets/javascripts/components/**/*.js' ],
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

        karma: {
            options: {
                configFile: 'karma.conf.js',
            },
            background: true
        },

        watch: {
            dev: {
                files: [ 'Gruntfile.js', 'assets/javascripts/**/*.js', '*.html' ],
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
                    ignore: ['node_modules/**', 'assets/**', 'public/**']
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

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('dev', [ 'bower', 'copy', 'concurrent' ]);
    grunt.registerTask('test', [ 'karma']);
};