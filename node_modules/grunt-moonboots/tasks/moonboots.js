/*
 * grunt-moonboots
 * https://github.com/matiasdecarli/grunt-moonboots
 *
 * Copyright (c) 2014 matiasdecarli
 * Licensed under the MIT license.
 */

'use strict';
var MoonbootsStatic = require('moonboots-static');


module.exports = function(grunt) {
  grunt.registerMultiTask('moonboots', 'A grunt task to [description]', function() {  
      var done = this.async();   
      
      var moonboots = new MoonbootsStatic(
		this.data.config);      
      console.log('outputting data to ',this.data.config.directory)
      moonboots.on('log', console.log);
      moonboots.on('ready', done);      
  });
};