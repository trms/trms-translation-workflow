/* eslint-env node */
'use strict';

let env = require('node-env-file');
env('./.env');

exports.bingCredentials = function(){
  const appId = process.env.BING_APP_ID;
  const subscriptionKey = process.env.BING_SUBSCRIPTION_KEY;
  return {appId,subscriptionKey};
}