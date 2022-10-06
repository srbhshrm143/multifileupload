import { Selector } from 'testcafe'
import { myUrl } from './pages/fixtures'
import { buyer2Role } from './pages/roles'
import { waitForSelector } from './pages/helper'


fixture.skip `Expiration`.page(myUrl)

test("Unpaid order status is expired after 'x' time", async (t) => {
  await t
    .useRole(buyer2Role)
    .navigateTo(myUrl + '/dashboard/buy/orders')

    let cancelledOrder = Selector('article').withText('CANCELLED BY YOU')
    let cancelledOrderDetails = cancelledOrder.find('a').withText('View details')

    await waitForSelector(cancelledOrder, "Expects order with status 'CANCELLED BY YOU'")
    await t.click(cancelledOrderDetails)

    let orderStatus = Selector('span[data-tc="order-status"]')

    await waitForSelector(orderStatus.withText('EXPIRED'), "Expects status of order is 'EXPIRED'")
})
