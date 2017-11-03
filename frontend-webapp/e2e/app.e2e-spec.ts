import { browser } from 'protractor';

import { AppPage } from './app.po';

describe('frontend-webapp App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have correct title message', async () => {
    await page.navigateTo();
    expect(await browser.getTitle()).toBe('Whalemart');
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getDisplayTitleText()).toEqual('Whalemart');
  });
});
