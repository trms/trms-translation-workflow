/* eslint-env node */
'use strict';

var https = require('https');

function getBingToken(creds) {
  if (!creds) { throw new Error('Bing Credentials are required'); }

  var admOptions = {
    hostname: 'api.cognitive.microsoft.com',
    port: 443,
    path: '/sts/v1.0/issueToken',
    method: 'POST',
    headers:{
      'Ocp-Apim-Subscription-Key':creds.subscriptionKey
    }
  };

  return new Promise((resolve, reject)=>{
    var req = https.request(admOptions, function (res) {

      res.setEncoding('utf8');

      var data = ''
      res.on('data', function (d){
        data += d;
      });

      res.on('error', function (err) {
        reject(err);
      });

      res.on('end', function () {
        var r = data;
        if (r.error) {
          reject(new Error(r.error));
        } else {
          resolve(r);
        }
      });
    });

    req.end();
  })
}

module.exports = getBingToken;