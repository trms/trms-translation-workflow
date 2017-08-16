/* eslint-env node */
'use strict';

let chalk = require('chalk');
let copyFiles = require('../utils/copy-translation-files');
let preTranslate = require('../utils/pre-translate');
const getBingToken = require('../utils/get-bing-token');
const {bingCredentials} = require('../utils/get-credentials');

module.exports = {
  name:'translate',
  description: 'copies files and pre-translates klingon',
  run(options){
    if(!options.language){
      options.language = 'tlh-Qaak';
    }
    copyFiles();
    this.ui.writeLine(chalk.green('english translation files cloned to other languages!'));
    let creds = bingCredentials();
    return getBingToken(creds).then((token)=>{
      return preTranslate(token,options.language);
    });
  },

}