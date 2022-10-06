import { Selector } from 'testcafe'
import { sellerA1Role } from './pages/roles'
import {
  myUrl,
  soldOrders,
} from './pages/fixtures'

fixture`Orders search`
  .page(myUrl)
  .meta('concurrency', 'true')

test('Merchant can use order statuses filters', async (t) => {
  await t
    .useRole(sellerA1Role)
    .navigateTo(myUrl + '/dashboard/sell/orders')

  let orderCount = () => Selector('section div ul').count;

  await t
    .expect(orderCount()).gte(6)

  await t
    //.expect(soldorders.filters.new.exists).ok()
    //.expect(soldOrders.statuses.inProgress.exists).ok()
    .expect(soldOrders.statuses.returned.exists).ok()
    .expect(soldOrders.statuses.delivered.exists).ok()
    .expect(soldOrders.statuses.cancelledByYou.exists).ok()
    .expect(soldOrders.statuses.completed.exists).ok()


  await t
    .click(soldOrders.buttons.filters)

  await t
    .click(soldOrders.filters.inProgress)
    .click(soldOrders.filters.delivered)
    .click(soldOrders.filters.cancelledByYou)
    .click(soldOrders.filters.returned)
    .click(soldOrders.filters.completed)

  await t
    .click(soldOrders.buttons.applyFilters)

  await t
    .expect(orderCount()).eql(0)

  //await t
    //.click(filtersButton)
    //.click(Selector('label').withText('New'))
    //.click(Selector('button').withText('Apply'))
    //.expect(orderCount()).eql(1)

  await t
    .expect(soldOrders.statuses.inProgress.exists).notOk()
    .click(soldOrders.buttons.filters)
    .click(soldOrders.filters.inProgress)
    .click(soldOrders.buttons.applyFilters)
    //.expect(soldOrders.statuses.inProgress.exists).ok()

  await t
    .expect(soldOrders.statuses.delivered.exists).notOk()
    .click(soldOrders.buttons.filters)
    .click(soldOrders.filters.delivered)
    .click(soldOrders.buttons.applyFilters)
    .expect(soldOrders.statuses.delivered.exists).ok()

  await t
    .expect(soldOrders.statuses.cancelledByYou.exists).notOk()
    .click(soldOrders.buttons.filters)
    .click(soldOrders.filters.cancelledByYou)
    .click(soldOrders.buttons.applyFilters)
    .expect(soldOrders.statuses.cancelledByYou.exists).ok()

  await t
    .expect(soldOrders.statuses.returned.exists).notOk()
    .click(soldOrders.buttons.filters)
    .click(soldOrders.filters.returned)
    .click(soldOrders.buttons.applyFilters)
    .expect(soldOrders.statuses.returned.exists).ok()

  await t
    .expect(soldOrders.statuses.completed.exists).notOk()
    .click(soldOrders.buttons.filters)
    .click(soldOrders.filters.completed)
    .click(soldOrders.buttons.applyFilters)
    .expect(soldOrders.statuses.completed.exists).ok()
})
