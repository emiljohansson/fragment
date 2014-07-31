'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-concat');

    require('time-grunt')(grunt);

    var config = {
        dist: 'dist'
    };

    grunt.initConfig({
        config: config,

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        concat: {
            dist: {
                src: [
                    '<%= pkg.name %>.prefix', '<%= pkg.name %>.js',
                    'event/*js',
                    'dom/EventDispatcher.js', 'dom/Element.js', 'dom/Container.js', 'dom/Button.js', 'dom/Root.js',
                    'state/*.js',
                    'util/*.js',
                    'plugin/**/*.js',
                    '<%= pkg.name %>.suffix'
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'concat',
        'uglify'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};
