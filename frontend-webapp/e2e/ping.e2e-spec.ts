import { browser } from 'protractor';

import { PingPage } from './ping.po';

describe('Server Ping', () => {
  let page: PingPage;

  beforeEach(() => {
    page = new PingPage();
  });

  it('should get the ping result correctly', async () => {
    await page.navigateTo();
    await browser.waitForAngular();
    const result = await page.getPingResult();
    expect(JSON.parse(result).pong).toEqual('pong');
  });
});
