/* eslint-env node */
'use strict';

var http = require('http');

function translate(token, text, from, to, cb) {
  var options = {
    hostname: 'api.microsofttranslator.com',
    port: 80,
    path: '/v2/ajax.svc/Translate?text='
      + encodeURIComponent(text) + '&from='
      + encodeURIComponent(from) + '&to='
      + encodeURIComponent(to),
    method: 'GET',
    headers:{
      Authorization: `Bearer ${token}`,
    }
  };

  return new Promise((resolve, reject)=>{

    var req = http.request(options, function (res) {
      res.setEncoding('utf8');

      var data = '';
      res.on('data', function (d) {
        data += d;
      });

      res.on('end', function () {
        // Strip out JSONP header and quotes
        resolve(data.substring(2, data.length - 1));
      });

      res.on('error', function (err) {
        reject(err)
      });
    });

    req.end();
  })
}

exports.translate = translate;