/* eslint-env node */
'use strict';

const chalk = require('chalk');
const _ = require('lodash');
const fs = require('fs-extra');
const {getKeys,getValues,createObject} = require('./translation-json-utils');
const translate = require('./translate-safe-string');

module.exports = function(bingToken,language){
  let promises = fs.readdirSync('app/locales/en/sections')
    .map(file=>{
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

      if(_.isEqual(getKeys(en),getKeys(other)) === false){
        return file;
      }
    })
    .filter(i=>i)
    .map(file=>{
      console.log(chalk.green(`... translating ${file}`));
      var en = fs.readJsonSync(`app/locales/en/sections/${file}`);
      let values = getValues(en);
      let keys = getKeys(en);

      let translatedStrings = values.map((string)=>translate(bingToken,string, language))

      return Promise.all(translatedStrings).then(translations=>{
        let json = createObject(keys, translations);
        fs.writeJsonSync(`app/locales/${language.toLowerCase()}/sections/${file}`,json,{spaces:2});
      });
    });

  return Promise.all(promises);
}
