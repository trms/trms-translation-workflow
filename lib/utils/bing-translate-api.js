/* eslint-env node */
'use strict';

const request = require('request-promise');

function translate(token, text, from, to) {
  const options = {
    uri: 'http://api.microsofttranslator.com/v2/ajax.svc/Translate?text='
      + encodeURIComponent(text) + '&from='
      + encodeURIComponent(from) + '&to='
      + encodeURIComponent(to),
    headers:{
      Authorization: `Bearer ${token}`,
    }
  };

  return request(options)
    .then(function(result){
      result = result.substring(2, result.length - 1);
      return result;
    })
    .catch(function(e){
      console.error(e);
    });
}

exports.translate = translate;