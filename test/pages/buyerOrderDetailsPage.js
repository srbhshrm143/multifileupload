import { Selector } from 'testcafe';

class BuyerOrderDetailsPage {
  constructor() {
    this.buttons = {
      returnItem: Selector('a.button').withText('Return'),
      returnRequested: Selector('a').withText('Requested'),
    }
    this.orderCompletionStatusIndicator = Selector('span[data-tc="order-completion-status"]')
      this.paymentStatusIndicator = Selector('span[data-tc="payment-status"]')
      this.title = Selector('.bigtitle')
  }
}

export default new BuyerOrderDetailsPage()
