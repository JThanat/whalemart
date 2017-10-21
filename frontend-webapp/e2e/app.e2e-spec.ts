import { AppPage } from './app.po';

describe('frontend-webapp App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getDisplayTitleText()).toEqual('Whalemart');
  });
});
