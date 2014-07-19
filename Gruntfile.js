/*
 *
 * Copyright (c) 2014 matiasdecarli
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var CDN = 'https://mrl-dev.global.ssl.fastly.net/testcontainer';

  var config = {
    public: __dirname + '/public',
    directory: __dirname + '/_build'    
  }
  
  var target = require(__dirname + '/config')(config);

  // Project configuration.
  grunt.initConfig({ 
      moonboots: {
        main: {
              config: target
          }   
      },      
      'azure-sync' : {
            options : {
                cacheControl: 'public, max-age=31556926'
            },
            text: {
                    options: {
                        compressionLevel: 9,
                        gzip: true,
                        removeFirstPath: true
                    },
                    files: [
                    {
                        src: [
                            '_build/**.css',
                            '_build/**.js',
                            '_build/**.html'
                            ],
                        dest: '/',
                        expand: true,
                        filter: 'isFile',
                    }]
                },
            images: {
                options:{
                  gzip: false,
                      removeFirstPath: true
                },
                  files: [
                  {
                      src: [                          
                          'public/images/**',                          
                    ],
                      dest: '/',
                      expand: true,
                      filter: 'isFile',
                  }]
            }
        }, 
        cdn: {
          options: {
            cdn: CDN        
          },
          html: {
            src: './_build/*.html'
          },
          css: {
            src: './_build/*.css'
          }          
        },             
  });

  grunt.registerTask('default', ['moonboots', 'cdn', 'azure-sync']);

  grunt.loadNpmTasks('grunt-cdn');
  grunt.loadNpmTasks('grunt-moonboots');
  grunt.loadNpmTasks('grunt-azure-sync');
};
