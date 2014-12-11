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
            },
        },
    });


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerTask('dev', [ 'bower', 'watch:dev' ]);
};