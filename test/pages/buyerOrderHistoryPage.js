import { Selector } from 'testcafe';

class BuyerOrderHistoryPage {
  constructor() {
    this.links = {
      itemDetails: Selector('article.card > ul > li > a'),
      viewDetails: Selector('article.card > header > a'),
    }
    this.orderStatusIndicator = Selector('span').withText('Status').sibling(1)
    this.orderTitle = Selector('article.card > header > div > h3')
    this.title = Selector('.bigtitle')
  }
}

export default new BuyerOrderHistoryPage()
