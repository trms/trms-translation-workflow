/* eslint-env node */
'use strict';

const flip = require('flip-text');
const _ = require('lodash');
const translator = require('./bing-translate-api');

// this allows the string to be split by {{value}} <tag> or opening and closing quotes
const regex = /((?:",*)|(?:&.+;)|(?:{{[^}]*}})|(?:<[^>]*>))/;

module.exports = function(token, string, language){
  return new Promise((resolve, reject)=>{
    let promises = _.split(string,regex)
      .filter(i=>i)
      .map(part=>{
        if(part.match(regex)){
          return new Promise(resolve=>resolve(part));
        }
        return translator.translate(token,string,'en',language);
        // return new Promise(resolve=>resolve(flip(part)));
      });

    resolve(Promise.all(promises).then(p=>{
      return p.join('');
    }));
  });
}


