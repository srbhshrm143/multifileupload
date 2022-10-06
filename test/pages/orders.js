import { Selector } from 'testcafe';
import { myUrl } from './fixtures';

export default class OrdersPage {
  constructor() {
    this.buttons = {
      checkout: Selector('button').withText('Checkout'),
      confirm: Selector('button').withText('Confirm'),
      pay: Selector('a').withText('Pay Online Example'),
      paySuccess: Selector('button').withText('PAY NOW'),
      continue: Selector('a').withText('Continue'),
      removeFromCart: Selector('button[title="Remove item"]'),
      save: Selector('button').withText('Save'),
      viewDetails: Selector('a').withText('View details'),
      return: Selector('li a').withText('Return'),
      sendReturnRequest: Selector('button').withText('Send return request'),
      returnDetails: Selector('a').withText('Return details'),
      acceptReturn: Selector('button').withText('Accept'),
      markAsReturned: Selector('button').withText('Mark as returned and refund payment'),
      filterOrders: Selector('button').withText('Filters')
    }
    this.list = {
      item: Selector('ul')
    }
    this.checkboxes = {
      markAsDelivered: Selector('#order_delivered'),
      returnToStore: Selector('#shipping_type_personal_pickup_')
    }
    this.cards = {
      card: Selector('ul li')
    }
    this.orders = {
      orderNumber: Selector('a[data-tc="order-id"]'),
    }
    this.statuses = {
      delivered: Selector('span').withText('OUT FOR DELIVERY'),
      readyForPickUp: Selector('span').withText('READY FOR PICKUP'),
      new: Selector('span').withText('new'),
      inProgress: Selector('span').withText('NEW'),
      returnRequested: Selector('div').withText('Requested'),
    }
    this.sold = {
      orderStatus: Selector('span[data-tc="order-status"]'),
    }
    this.urls = {
      buyer: (myUrl + '/dashboard/buy/orders'),
      seller: (myUrl + '/dashboard/sell/orders')
    }
  }
}
