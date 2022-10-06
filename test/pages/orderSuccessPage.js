import { Selector } from 'testcafe';

class OrderSuccessPage {
  constructor() {
    this.title = Selector('.bigtitle')
    this.links = {
      orderHistory: Selector('section.card > div > p > a').withText('Order history')
    }
  }
}

export default new OrderSuccessPage()
