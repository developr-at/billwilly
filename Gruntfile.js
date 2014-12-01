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
          'public/javascripts/dist/services.js': [ 'public/javascripts/components/**/*.service.js' ]
        }
      }
    },

    jshint: {
      all: [ 'Gruntfile.js', 'public/javascripts/*.js', 'public/javascripts/**/*.js' ]
    },

    // connect: {
    //   server: {
    //     options: {
    //       hostname: 'localhost',
    //       port: 8080
    //     }
    //   }
    // },

    watch: {
      dev: {
        files: [ 'Gruntfile.js', 'public/javascripts/**/*.js', '!public/javascripts/dist/*.js', '*.html' ],
        // tasks: [ 'jshint', 'karma:unit', 'html2js:dist', 'concat:dist', 'clean:temp' ],
        tasks: [ 'jshint'/*, 'karma:unit'*/, 'concat:dist'/*, 'clean:temp'*/ ],
        options: {
          atBegin: true
        }
      },
      // min: {
      //   files: [ 'Gruntfile.js', 'public/javascripts/*.js', '*.html' ],
      //   tasks: [ 'jshint', 'karma:unit', 'concat:dist'/*, 'clean:temp'*/, 'uglify:dist' ],
      //   options: {
      //     atBegin: true
      //   }
      // }
    },

    // compress: {
    //   dist: {
    //     options: {
    //       archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
    //     },
    //     files: [{
    //       src: [ 'index.html' ],
    //       dest: '/'
    //     }, {
    //       src: [ 'dist/**' ],
    //       dest: 'dist/'
    //     }, {
    //       src: [ 'assets/**' ],
    //       dest: 'assets/'
    //     }, {
    //       src: [ 'libs/**' ],
    //       dest: 'libs/'
    //     }]
    //   }
    // },

    karma: {
      options: {
        configFile: 'config/karma.conf.js'
      },
      unit: {
        singleRun: true
      },

      continuous: {
        singleRun: false,
        autoWatch: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-connect');
  // grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('dev', [ 'bower', 'watch:dev' ]);
  // grunt.registerTask('test', [ 'bower', 'jshint', 'karma:continuous' ]);
  // grunt.registerTask('minified', [ 'bower', 'connect:server', 'watch:min' ]);
  // grunt.registerTask('package', [ 'bower', 'jshint', 'karma:unit', 'concat:dist', 'uglify:dist', 'compress:dist' ]);
};