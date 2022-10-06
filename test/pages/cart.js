import { Selector } from 'testcafe';

export default class Cart {
  constructor() {
    this.buttons = {
      checkout: Selector('button').withText('Checkout')
    }
    this.continueShopping = Selector('a').withText('Continue shopping')
    this.header = Selector('h2.bigtitle')
    this.prices = {
      itemTotal: Selector('#data-item-totalprice'),
      orderDelivery: Selector('div[data-shipping]'),
      orderSubtotal: Selector('div[data-subtotal]'),
      orderTotal: Selector('#data-order-totalprice'),
    }
    this.product = Selector('section[data-tc="cart-product"]')
    this.productQuantity = Selector('input[data-tc="cart-product-quantity"]')
  }
}
