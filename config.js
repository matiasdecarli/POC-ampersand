var _ = require('underscore');
var path = require('path');
var config = require('getconfig');
var stylizer = require('stylizer');
var templatizer = require('templatizer');

module.exports = function (obj) {

	var fixPath = function (pathString) {
	    return path.resolve(path.normalize(pathString));
	};
    
    // A flag to sample what happens with long before build functions
    var complex = process.argv.join(' ').indexOf('--complex') > -1;

    return _.extend({
        moonboots: {
	        jsFileName: 'test-project',
	        cssFileName: 'test-project',
	        main: fixPath('client/app.js'),
	        developmentMode: config.isDev,
	        libraries: [
	            fixPath('client/libraries/zepto.js')
	        ],
	        stylesheets: [
	            fixPath('public/css/bootstrap.css'),
	            fixPath('public/css/app.css')
	        ],
	        browserify: {
	            debug: false
	        },
	        beforeBuildJS: function () {
	            // This re-builds our template files from jade each time the app's main
	            // js file is requested. Which means you can seamlessly change jade and
	            // refresh in your browser to get new templates.
	            if (config.isDev) {
	                templatizer(fixPath('templates'), fixPath('client/templates.js'));
	            }
	        },
	        beforeBuildCSS: function (done) {
	            // This re-builds css from stylus each time the app's main
	            // css file is requested. Which means you can seamlessly change stylus files
	            // and see new styles on refresh.
	            if (config.isDev) {
	                stylizer({
	                    infile: fixPath('public/css/app.styl'),
	                    outfile: fixPath('public/css/app.css'),
	                    development: true
	                }, done);
	            } else {
	                done();
	            }
	        },
	        //resourcePrefix: ''
	    }
    }, obj);
};