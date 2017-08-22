/* eslint-env node */
'use strict';

const flip = require('flip-text');
const _ = require('lodash');
const translator = require('./bing-translate-api');
var Promise = require('promise');

// this allows the string to be split by {{value}} <tag> or opening and closing quotes
const regex = /((?:",*)|(?:&.+;)|(?:{{[^}]*}})|(?:<[^>]*>))/;

module.exports = function(token, string, language){
  return new Promise(function(resolve, reject){
    let promises = _.split(string,regex)
      .filter(function(i){return i})
      .map(function(part){
        if(part.match(regex)){
          return new Promise(function(resolve){return resolve(part);});
        }
        return translator.translate(token,string,'en',language);
        // return new Promise(function(resolve){ return resolve(flip(part))});
      });

    resolve(Promise.all(promises).then(function(p){
      return p.join('');
    }));
  });
}


