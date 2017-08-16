/* eslint-env node */
'use strict';

module.exports = {
  name: 'translation-workflow',

  isDevelopingAddon() {
    return true;
  },
  includedCommands(){
    return {
      'translate': require('./lib/commands/pre-translate'),
    }
  },
};
