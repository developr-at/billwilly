/*jslint node: true */
"use strict";

var rewrite = require('connect-modrewrite');

module.exports = function(grunt) {

    // Configurable paths for the application
    var appConfig = {
        app: 'app',
        dist: 'dist',
        doc: 'doc',
        libs: 'bower_components'
    };

    grunt.initConfig({

        // Project settings
        billwilly: appConfig,

        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    targetDir: '<%= billwilly.libs %>',
                    cleanTargetDir: true
                }
            }
        },

        clean: {
            dist: {
                src: [ '<%= billwilly.dist %>']
            },

            doc: {
                src: [ '<%= billwilly.doc %>']
            }
        },

        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                keepalive: true,

              // http://danburzo.ro/grunt/chapters/server/
              middleware: function(connect, options) {

                var middleware = [];

                // 1. mod-rewrite behavior
                var rules = [
                    '!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ /index.html'
                ];
                middleware.push(rewrite(rules));

                // 2. original middleware behavior
                var base = options.base;
                if (!Array.isArray(base)) {
                    base = [base];
                }
                base.forEach(function(path) {
                    middleware.push(connect.static(path));
                });

                return middleware;

              }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= billwilly.dist %>'
                }
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                files: {
                    '<%= billwilly.dist %>/scripts/libraries.js': [
                        "<%= billwilly.libs %>/angular/angular.js",
                        "<%= billwilly.libs %>/angular-cookies/angular-cookies.js",
                        "<%= billwilly.libs %>/angular-messages/angular-messages.js",
                        "<%= billwilly.libs %>/angular-ui-router/release/angular-ui-router.js",
                        "<%= billwilly.libs %>/angular-google-chart/ng-google-chart.js",
                        "<%= billwilly.libs %>/angular-smart-table/dist/smart-table.min.js",
                        "<%= billwilly.libs %>/jquery/dist/jquery.js",
                        "<%= billwilly.libs %>/bootstrap/dist/js/bootstrap.js"
                    ],

                    '<%= billwilly.dist %>/scripts/main.js': [ '<%= billwilly.app %>/scripts/angularApp.js', '<%= billwilly.app %>/scripts/angular-core.js' ],
                    '<%= billwilly.dist %>/scripts/modules.js': [ '<%= billwilly.app %>/scripts/components/**/*.module.js' ],
                    '<%= billwilly.dist %>/scripts/controllers.js': [ '<%= billwilly.app %>/scripts/components/**/*.controller.js' ],
                    '<%= billwilly.dist %>/scripts/services.js': [ '<%= billwilly.app %>/scripts/components/**/*.service.js' ],
                    '<%= billwilly.dist %>/scripts/directives.js': [ '<%= billwilly.app %>/scripts/components/**/*.directive.js' ]
                }
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= billwilly.app %>',
                    dest: '<%= billwilly.dist %>',
                    src: [
                        '.htaccess',
                        '*.html',
                        'views/{,*/}*.html',
                        'images/{,*/}*.png',
                    ]
                }, {
                    cwd: '<%= billwilly.libs %>/bootstrap/dist',
                    src: '**/*',
                    dest: '<%= billwilly.dist %>/libs/bootstrap',
                    expand: true
                }]
            }
        },

        htmlangular: {
            options: {
                tmplext: 'tmpl.html',
                customtags: [],
                customattrs: [ 'st-table', 'st-sort', 'chart', 'google-chart', 'compare-to', 'unique-email' ],
                relaxerror: [
                    'Attribute src not allowed on element div at this point.'
                ]
            },
            files: {
                src: [ '<%= billwilly.app %>/index.html', '<%= billwilly.app %>/views/**/*.html' ]
            }
        },

        less: {
            dev: {
                files: {
                    '<%= billwilly.dist %>/styles/app.css': '<%= billwilly.app %>/styles/app.less'
                }
            }
        },

        jshint: {
            all: [ 'Gruntfile.js', '<%= billwilly.app %>/*.js', '<%= billwilly.app %>/scripts/components/**/*.js' ]
        },

        jsdoc: {
            frontend: {
                src: [ '<%= billwilly.app %>/scripts/components/**/*.js' ],
                options: {
                    destination: 'doc',
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
                files: [ 'Gruntfile.js', '<%= billwilly.app %>/scripts/**/*.js', '*.html' ],
                tasks: [ 'jshint', 'concat:dist' ],
                options: {
                    atBegin: true
                }
            },

            css: {
                files: [ '<%= billwilly.app %>/styles/*.less' ],
                tasks: [ 'less:dev' ],
                options: {
                    atBegin: true
                }
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },

            tasks: ['watch:css', 'watch:dev', 'connect:dist']
        }
    });

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html-angular-validate');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('dev', [ 'bower', 'htmlangular', 'clean:dist', 'copy', 'concurrent' ]);
    grunt.registerTask('test', [ 'karma' ]);

    grunt.registerTask('doc', [ 'clean:doc', 'jsdoc' ]);
};