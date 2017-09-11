const { config } = require('./protractor.conf');

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--headless', '--disable-gpu']
  }
};

exports.config = config;