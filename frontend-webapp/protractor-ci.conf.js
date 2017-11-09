const { config } = require('./protractor.conf');

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    binary: require('puppeteer').executablePath(),
    args: ['--headless', '--disable-gpu', '--no-sandbox', '--disable-setuid-sandbox']
  }
};

exports.config = config;
