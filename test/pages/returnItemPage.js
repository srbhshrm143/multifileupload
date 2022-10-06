import { Selector } from 'testcafe';


class ReturnItemPage {
  constructor() {
    this.buttons = {
      sendReturnRequest: Selector('button.button').withText('Send return request')
    }
    this.inputs = {
      quantity: Selector('#quantity'),
      reason: Selector('#reason'),
      reasonDetails: Selector('#reason_details'),
    }
    this.radiobuttons = {
      returnToStore: Selector('#shipping_type_personal_pickup_'),
      returnWithDelivery: Selector('#shipping_type_delivery_'),
    }
    this.title = Selector('.bigtitle')
  }
}

export default new ReturnItemPage()
