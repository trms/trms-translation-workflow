/* eslint-env node */
'use strict';

const RSVP = require('rsvp');

module.exports = {
  name: 'translation-workflow',

  isDevelopingAddon() {
    return true;
  },

  includedCommands(){
    return {
      'translate': require('./lib/commands/translate'),
    }
  },

  afterInstall: function(options) {
    return RSVP.all([
      this.addPackageToProject('flip-text'),
      this.addPackageToProject('fs-extra'),
      this.addPackageToProject('node-env-file'),
      this.addPackageToProject('lodash'),
    ])
  }
};
