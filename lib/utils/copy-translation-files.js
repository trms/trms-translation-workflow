/* eslint-env node */
'use strict';

const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')
const fs = require('fs-extra');
const _ = require('lodash');

module.exports = function(){

  const isDirectory = source => lstatSync(source).isDirectory()
  const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory)

  getDirectories('app/locales')
    .forEach((directory)=>{
      if(!directory.match(/en$/)){
        fs.copySync('app/locales/en/translations.js',`${directory}/translations.js`);
      }
    });

  let locales = getDirectories('app/locales')
    .map(directory=>getLocaleFromDirectory(directory));

  fs.writeJSONSync('public/assets/locale_manifest.json',{locales});
}

function getLocaleFromDirectory(directory){
  return directory.slice(directory.lastIndexOf('/')+1);
}