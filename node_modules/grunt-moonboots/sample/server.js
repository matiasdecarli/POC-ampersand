var express = require('express');
var Moonboots = require('moonboots');
var app = express();

// configure our app
var clientApp = new Moonboots({
    main: __dirname + 'app/app.js',
    libraries: [
        __dirname + 'libraries/jquery-2.1.0.js'
    ],
    stylesheets: [
        __dirname + 'stylesheets/style.css'
    ]
});

app.get(clientApp.jsFileName(),
    function (req, res) {
        clientApp.jsSource(function (err, js) {
            res.send(js);
        })
    }
);
app.get('/app*', clientApp.htmlSource());

// start listening for http requests
app.listen(3000);