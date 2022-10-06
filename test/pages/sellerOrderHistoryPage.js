import { Selector } from 'testcafe';

class SellerOrderHistoryPage {
  constructor() {
    this.links = {
      orderDetails: Selector('a[data-tc="order-id"]'),
    }
    this.orderStatusIndicator = Selector('span[data-tc="order-status"]')
    this.title = Selector('.bigtitle')
  }
}

export default new SellerOrderHistoryPage()
