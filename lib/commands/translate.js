/* eslint-env node */
'use strict';

const chalk = require('chalk');
const copyFiles = require('../utils/copy-translation-files');
const preTranslate = require('../utils/pre-translate');
const getBingToken = require('../utils/get-bing-token');
const {bingCredentials} = require('../utils/get-credentials');

module.exports = {
  name:'translate',
  description: 'copies files and pre-translates klingon',
  run(options){
    if(!options.language){
      options.language = 'tlh-Qaak';
    }
    let creds = bingCredentials();
    return getBingToken(creds).then((token)=>{
      return preTranslate(token,options.language);
    }).then(()=>{
      copyFiles();
      this.ui.writeLine(chalk.green('translation complete!'));
    });
  },

}