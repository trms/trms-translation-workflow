/* eslint-env node */
'use strict';

const path = require('path')
const fs = require('fs-extra');
const _ = require('lodash');

module.exports = function(){

  const isDirectory = function(source){
    return fs.lstatSync(source).isDirectory();
  }

  const getDirectories = function(source) {
    return fs.readdirSync(source)
      .map(function (name) {
        return path.join(source, name);
      })
      .filter(isDirectory);
  }

  getDirectories('app/locales')
    .forEach(function(directory){
      if(!directory.match(/en$/)){
        fs.copySync('app/locales/en/translations.js',`${directory}/translations.js`);
      }
    });

  let locales = getDirectories('app/locales')
    .map(function (directory){
      return getLocaleFromDirectory(directory)
    });

  fs.writeJSONSync('public/assets/locale_manifest.json',{locales});
}

function getLocaleFromDirectory(directory){
  return directory.slice(directory.lastIndexOf('/')+1);
}