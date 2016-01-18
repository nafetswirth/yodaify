
// app.js
// 
// Copyright (c) 2016 Stefan Wirth
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

//deps
var app = require('express')();
var https = require('https');
var bodyParser = require('body-parser');

//globals
var YODA_API_KEY = process.env.YODA_API_KEY;
var YODA_API_HOST = process.env.YODA_API_HOST || 'yoda.p.mashape.com';
var PORT = process.env.PORT || 8080;

var OK = 200;
var SERVER_ERROR = 500;
var ERROR_CODE = 1;

app.use(bodyParser.json());

app.post('/yodas', function(req, res) {
    var text = req.body.text || 'Do you even write?';

    yodaify({
        host: YODA_API_HOST,
        path: '/yoda?sentence=' + encodeURIComponent(text),
        headers: {
            'X-Mashape-Key': YODA_API_KEY,
            'Accept': 'text/plain'
        }
    })
    .then(function(yodaifyedResponse) {
        res.status(OK).json({text: yodaifyedResponse});
    })
    .catch(function(err) {
        res.status(SERVER_ERROR).json({error: err});
    });
});

app.listen(PORT, function() {
    if(!YODA_API_KEY) {
        console.error('Missing YODA_API_KEY in env vars');
        process.exit(ERROR_CODE);
    }

    console.log('Server started');
});

function yodaify(options) {
    return new Promise(function(resolve, reject) {
        https.request(options, function(response) {
            var yodaRes = '';
            response.on('data', function(chunk) {
                yodaRes += chunk;
            });

            response.on('error', function(err) {
                reject(err);
            });

            response.on('end', function() {
                resolve(yodaRes);
            });
        }).end();
    });
}