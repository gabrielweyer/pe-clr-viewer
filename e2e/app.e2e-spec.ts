import { PeClrViewerPage } from './app.po';

describe('pe-clr-viewer App', () => {
  let page: PeClrViewerPage;

  beforeEach(() => {
    page = new PeClrViewerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
