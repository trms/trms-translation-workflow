/* eslint-env node */
'use strict';

var chalk = require('chalk');
var copyFiles = require('../utils/copy-translation-files');
var preTranslate = require('../utils/pre-translate');
var getBingToken = require('../utils/get-bing-token');
var creds = require('../utils/get-credentials');

module.exports = {
  name:'translate',
  description: 'copies files and pre-translates klingon',
  run(options){
    if(!options.language){
      options.language = 'tlh-Qaak';
    }
    var c = creds.bingCredentials();
    return getBingToken(c)
      .then(function(token){
        return preTranslate(token,options.language);
      })
      .then(()=>{
        copyFiles();
        this.ui.writeLine(chalk.green('translation compvare!'));
      });
  },

}