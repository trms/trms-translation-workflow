/* eslint-env node */
'use strict';

var chalk = require('chalk');
var _ = require('lodash');
var fs = require('fs-extra');
var jsonUtils = require('./translation-json-utils');
var translate = require('./translate-safe-string');
var Promise = require('promise');

module.exports = function(bingToken,language){
  var promises = fs.readdirSync('app/locales/en/sections')
    .map(function(file){
      fs.ensureFileSync(`app/locales/${language.toLowerCase()}/sections/${file}`);

      try{
        var other = fs.readJsonSync(`app/locales/${language.toLowerCase()}/sections/${file}`);
      } catch(e){
        other = {};
      }

      try{
        var en = fs.readJsonSync(`app/locales/en/sections/${file}`);
      } catch(e){
        throw Error(`${file} is not well formatted JSON`);
      }

      if(_.isEqual(jsonUtils.getKeys(en),jsonUtils.getKeys(other)) === false){
        return file;
      }
    })
    .filter(function(i){return i})
    .map(function (file){
      console.log(chalk.green(`... translating ${file}`));
      var en = fs.readJsonSync(`app/locales/en/sections/${file}`);
      var values = jsonUtils.getValues(en);
      var keys = jsonUtils.getKeys(en);

      var translatedStrings = values.map(function(string){
        return translate(bingToken,string, language)
      });

      return Promise.all(translatedStrings).then(function(translations){
        var json = jsonUtils.createObject(keys, translations);
        fs.writeJsonSync(`app/locales/${language.toLowerCase()}/sections/${file}`,json,{spaces:2});
      });
    });

  return Promise.all(promises);
}
