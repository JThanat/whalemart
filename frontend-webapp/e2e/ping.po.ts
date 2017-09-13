import { browser, by, element } from 'protractor';

export class PingPage {
  navigateTo() {
    return browser.get('/ping');
  }

  getPingResult() {
    return element(by.tagName('pre')).getText();
  }
}
