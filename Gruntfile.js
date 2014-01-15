module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-cli');


    grunt.initConfig({

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: ['Gruntfile.js'],
            lib: ['lib/*.js'],
            test: ['test/**/*.js']
        },

        mochacli: {
            options: {
                reporter: 'dot'
            },
            unit: {
                files: {
                    src: ['test/*.test.js']
                }
            },
            functional: {
                options: {
                    timeout: 5000
                },
                files: {
                    src: ['test/functional/*.test.js']
                }
            }
        },

        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: '<%= jshint.lib %>',
                tasks: ['jshint:lib', 'mochacli']
            },
            test: {
                files: '<%= jshint.test %>',
                tasks: ['jshint:test', 'mochacli']
            },
        },

    });


    grunt.registerTask('test', ['jshint', 'mochacli']);
    grunt.registerTask('default', ['test']);

};
