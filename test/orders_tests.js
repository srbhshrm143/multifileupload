import { Role } from 'testcafe'
import { buyer2Role, sellerA1Role } from './pages/roles'
import { 
  buyer2,
  cartPage,
  item2,
  item3,
  item4,
  myUrl,
} from './pages/fixtures'
import {  getPriceFromString } from './pages/helper'
import buyerOrderDetailsPage from './pages/buyerOrderDetailsPage'
import buyerOrderHistoryPage from './pages/buyerOrderHistoryPage'
import itemShow from './pages/itemshow'
import orderConfirmationPage from './pages/orderConfirmationPage'
import orderReviewPage from './pages/orderReviewPage'
import orderSuccessPage from './pages/orderSuccessPage'
import paymentGatewayPage from './pages/paymentGateway'
import returnItemPage from './pages/returnItemPage.js'
import returnItemDetailsPage from './pages/returnItemDetailsPage.js'
import sellerOrderDetailsPage from './pages/sellerOrderDetailsPage'
import sellerOrderHistoryPage from './pages/sellerOrderHistoryPage'


fixture`Testing buying and selling items`
  .page(myUrl)
  .meta('concurrency', 'true')
  .afterEach(async t => {
    await t.useRole(Role.anonymous())
  })


test('Buying items from three different merchants', async (t) => {
  await t
    .useRole(buyer2Role)

    .navigateTo(myUrl + item2.path)
    .click(itemShow.buttons.addToCart)
    .click(cartPage.continueShopping)

    .navigateTo(myUrl + item3.path)
    .click(itemShow.buttons.addToCart)
    .click(cartPage.continueShopping)

    .navigateTo(myUrl + item4.path)
    .click(itemShow.buttons.addToCart)

  // In the cart
  let result = 0
  for (let i = 0; i < 3; i++) {
    let price = await getPriceFromString(cartPage.prices.itemTotal.nth(i).innerText, '$')
    result += parseFloat(price)
  }
  const calculatedTotalPrice = result
  let deliveryPrice = 0

  let displayedTotalPriceInCart = await getPriceFromString(cartPage.prices.orderTotal.innerText, '$')
  let totalPrice = calculatedTotalPrice + deliveryPrice

  await t.expect(calculatedTotalPrice.toString()).eql(displayedTotalPriceInCart)

  await t.click(cartPage.buttons.checkout)

  // At order review page
  let displayedTotalPriceInReview = await getPriceFromString(orderReviewPage.prices.total.innerText, '$')

  await t.expect(totalPrice).eql(parseFloat(displayedTotalPriceInReview))

  await t.typeText(orderReviewPage.inputs.firstName, buyer2.firstName, { replace: true, paste: true })
  await t.typeText(orderReviewPage.inputs.lastName, buyer2.lastName, { replace: true, paste: true })
  await t.typeText(orderReviewPage.inputs.email, buyer2.email, { replace: true, paste: true })
  await t.typeText(orderReviewPage.inputs.phone, buyer2.phone, { replace: true, paste: true })

  const fullName = buyer2.firstName + ' ' + buyer2.lastName
  const homeDeliveries = orderReviewPage.shippingMethodSection
  const deliveriesCount = await homeDeliveries.count

  let orderId = ''
  let orderIds = []
  for (let i = 0; i < deliveriesCount; i++) {
    await t.click(orderReviewPage.labels.homeDelivery.nth(i))
    await orderReviewPage.fillInHomeDeliveryForm(
      i, fullName, 'Iceland', 'Reykjavik', 'First State', 'First Street', '101', '2', '4', false)
    const radioButton = await orderReviewPage.radiobuttons.homeDelivery.nth(i)()
    const attributeValue = radioButton.getAttribute('name')
    orderId = parseFloat(attributeValue.match(/\d+/)).toString()
    orderIds.push(orderId)
  }

  const acceptedOrderId1 = orderIds[0]
  const acceptedOrderId2 = orderIds[2]
  const cancelledOrderId = orderIds[1]


  await t.click(orderReviewPage.buttons.orderReviewAndConfirm)

  // At order confirmation page
  let displayedSubtotalPriceInConfirmation = await getPriceFromString(orderConfirmationPage.prices.subtotal.innerText, '$')
  let expectedDeliveryPriceInConfirmation = 11.5
  let displayedDeliveryPriceInConfirmation = await getPriceFromString(orderConfirmationPage.prices.delivery.innerText, '$')

  let displayedTotalPriceInConfirmation = await getPriceFromString(orderConfirmationPage.prices.total.innerText, '$')

  totalPrice = parseFloat(displayedSubtotalPriceInConfirmation) + parseFloat(displayedDeliveryPriceInConfirmation)

  await t
    .expect(parseFloat(displayedDeliveryPriceInConfirmation)).eql(expectedDeliveryPriceInConfirmation)
    .expect(parseFloat(displayedTotalPriceInConfirmation)).eql(totalPrice)

  await t
    .click(orderConfirmationPage.buttons.back)

  // Back in cart
  let displayedSubtotalPriceInCart = await getPriceFromString(cartPage.prices.orderSubtotal.innerText, '$')
  let displayedDeliveryPriceInCart = await getPriceFromString(cartPage.prices.orderDelivery.innerText, '$')
  displayedTotalPriceInCart = await getPriceFromString(cartPage.prices.orderTotal.innerText, '$')

  await t
    .expect(displayedSubtotalPriceInCart).eql(displayedSubtotalPriceInConfirmation)
    .expect(displayedDeliveryPriceInCart).eql(displayedDeliveryPriceInConfirmation)
    .expect(displayedTotalPriceInCart).eql(displayedTotalPriceInConfirmation)

  await t
    .click(cartPage.buttons.checkout)
    .click(orderReviewPage.buttons.orderReviewAndConfirm)

  // At order confirmation page
  await t
    .click(orderConfirmationPage.links.changeShipmentMethod)

  // At order review page
  await t
    .click(orderReviewPage.labels.personalPickup) 
    .expect(orderReviewPage.radiobuttons.personalPickup.checked).ok()

  for (let i = 0; i < deliveriesCount; i++) {
    await t.expect(orderReviewPage.inputs.visible.value).notEql('')
  }

  await t.click(orderReviewPage.buttons.orderReviewAndConfirm)

  // At order confirmation page
  expectedDeliveryPriceInConfirmation = 7
  displayedTotalPriceInConfirmation = await getPriceFromString(orderConfirmationPage.prices.total.innerText, '$')
  displayedDeliveryPriceInConfirmation = await getPriceFromString(orderConfirmationPage.prices.delivery.innerText, '$')

  await t.expect(parseFloat(displayedDeliveryPriceInConfirmation)).eql(expectedDeliveryPriceInConfirmation)

  await t.click(orderConfirmationPage.buttons.orderConfirmation)

  // At payment gateway page
  await  t.click(paymentGatewayPage.buttons.paymentSuccess)

  // At payment confirmation page
  await t
    .expect(orderSuccessPage.links.orderHistory.exists).ok()
    .click(orderSuccessPage.links.orderHistory)


  // At buyer's order history page
  await t
    .expect(buyerOrderHistoryPage.title.withText('Orders history').exists).ok()
    .expect(buyerOrderHistoryPage.orderTitle.withText(orderIds[0]).exists).ok()

  await t
    .click(buyerOrderHistoryPage.links.viewDetails.withAttribute('data-tc', `${orderIds[0]}`))
    .expect(buyerOrderDetailsPage.title.innerText).contains(acceptedOrderId1)
    .expect(buyerOrderDetailsPage.paymentStatusIndicator.innerText).contains('SUCCESS')
})

test('Merchant accepts an order', async (t) => {
  const orderId = '7684'
  await t
    .useRole(sellerA1Role)
    .navigateTo(myUrl + '/dashboard/sell/orders')
    .expect(sellerOrderHistoryPage.links.orderDetails.withText(orderId).exists).ok()

  await t.click(sellerOrderHistoryPage.links.orderDetails.withText(orderId))
  await t.expect(sellerOrderDetailsPage.deliveryStatusIndicator.withText('NEW').exists).ok()
  await sellerOrderDetailsPage.markOrderAsDelivered()
  await t.expect(sellerOrderDetailsPage.deliveryStatusIndicator.innerText).eql('OUT FOR DELIVERY')
  await sellerOrderDetailsPage.markOrderAsCompleted()
  await t.expect(sellerOrderDetailsPage.orderCompletionStatusIndicator.withText('COMPLETED').exists).ok()
})

test('Merchant cancels an order', async (t) => {
  const orderId = '7741'
  await t
    .useRole(sellerA1Role)
    .navigateTo(myUrl + '/dashboard/sell/orders')
    .expect(sellerOrderHistoryPage.links.orderDetails.withText(orderId).exists).ok()

  await t
    .click(sellerOrderHistoryPage.links.orderDetails.withText(orderId))
    .expect(sellerOrderDetailsPage.paymentStatusIndicator.innerText).eql('SUCCESS')

  await t
    .click(sellerOrderDetailsPage.backIntoStockLabel)
    .setNativeDialogHandler(() => true)
    .click(sellerOrderDetailsPage.buttons.cancelOrder)
    .expect(sellerOrderDetailsPage.cancellationSubtitle.exists).ok()
})

test('Buyer returns an item', async (t) => {
  const orderId = '7695'
  await t
    .useRole(buyer2Role)
    .navigateTo('/dashboard/buy/orders')

  await t
    .click(buyerOrderHistoryPage.links.viewDetails.withAttribute('data-tc', `${orderId}`))
    .expect(buyerOrderDetailsPage.paymentStatusIndicator.innerText).eql('SUCCESS')
    .expect(buyerOrderDetailsPage.orderCompletionStatusIndicator.innerText).eql('COMPLETED')

  await t
    .click(buyerOrderDetailsPage.buttons.returnItem)
    .expect(returnItemPage.title.innerText).eql('Return item')
    .typeText(returnItemPage.inputs.reason, 'I don\'t like it at all and it\'s too expen$ive!', { paste: true })
    .typeText(returnItemPage.inputs.reasonDetails, 'Co$t$ too much $$$!!!', { paste: true })
    .click(returnItemPage.radiobuttons.returnToStore)
    .click(returnItemPage.buttons.sendReturnRequest)

  await t
    .expect(buyerOrderDetailsPage.title.innerText).eql('Order ' + `${orderId}`)
    .expect(buyerOrderDetailsPage.buttons.returnRequested.exists).ok()
    .click(buyerOrderDetailsPage.buttons.returnRequested)
    .expect(returnItemDetailsPage.itemReturnStatusIndicator.innerText).eql('REQUESTED')

})
