console.log('Loading function');

const https = require('https');
const url = require('url');
const post_url = 'https://cloud.docker.com/api/build/v1/source/b7ef1a1c-60d2-4b78-a5fe-d526a56191a9/trigger/c526e109-c2bf-491e-a806-b0d84a71185e/call/';
let req_opts = url.parse(post_url);
req_opts.method = 'POST';
req_opts.headers = {'Content-Type': 'application/json'};

exports.handler = function(event, context) {
    var req = https.request(req_opts, function (res) {
        if (res.statusCode >= 200 && res.statusCode <= 299) {
            context.succeed('posted');
        } else {
            context.fail('status code: ' + res.statusCode);
        }
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
        context.fail(e.message);
    });

    req.write(JSON.stringify({build:true}));
    req.end();
};