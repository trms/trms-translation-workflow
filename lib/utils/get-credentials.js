/* eslint-env node */
'use strict';

let env = require('node-env-file');
let chalk = require('chalk');

exports.bingCredentials = function(){
  loadENV();
  const appId = process.env.BING_APP_ID;
  const subscriptionKey = process.env.BING_SUBSCRIPTION_KEY;
  return {appId:appId,subscriptionKey:subscriptionKey};
}

function loadENV(){
  try{
    env('./.env');
  } catch (e){
    throw Error('A .env file containing BING_APP_ID and BING_SUBSCRIPTION_KEY in the root of your project is required for translations');
  }
}