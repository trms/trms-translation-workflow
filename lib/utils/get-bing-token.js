/* eslint-env node */
'use strict';

const request = require('request-promise');

function getBingToken(creds) {
  if (!creds) { throw new Error('Bing Credentials are required'); }

  const options = {
    uri: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken',
    method: 'POST',
    headers:{
      'Ocp-Apim-Subscription-Key':creds.subscriptionKey
    }
  };

  return new request(options)
    .then(function (result){
      if(result.error){
        throw Error(result.error);
      }
      return result;
    })
    .catch(function (error){
      console.error(error);
    });
}

module.exports = getBingToken;