import { Selector, t } from 'testcafe'
import { buyer2Role, sellerB1Role, randomPersonRole, sellerA1Role } from './pages/roles'
import {
  myUrl,
  commentText,
  topMenu,
  dashboard,
  activityFeed,
  Anon
} from './pages/fixtures'
import { checkErrors, waitForSelector } from './pages/helper'

fixture.skip`Activity`.page(myUrl)

test('Post feed', async (t) => {
  await t
    .useRole(randomPersonRole)
    .click(topMenu.buttons.profileDropdown)
    .click(topMenu.profileDropdown.dashboard)
  await t.click(dashboard.nav.activityFeed)
  await t
    .typeText(activityFeed.inputs.message, commentText)
    .click(activityFeed.buttons.send)

  await checkErrors()

  await t
    .click(topMenu.buttons.profileDropdown)
    .click(topMenu.profileDropdown.dashboard)
    .click(topMenu.buttons.publicProfile)

  await waitForSelector(Selector('div').withText(commentText), "Expects comment 'commentText' in Activity Feed")
})

test.skip('Buyer Frank checks his feed', async (t) => {
  await t
    .useRole(buyer2Role)
    .navigateTo(myUrl + "/dashboard")

  await checkErrors()

  await t
    .expect(Selector('[data-tc="private-feed"]').withText('Organization A completed the Order').exists).ok()
    .expect(Selector('[data-tc="private-feed"]').withText('Organization B completed the Order').exists).ok()

    const completedOrdersA = Selector('[data-tc="private-feed"]').withText('Organization A completed the Order').count
    const completedOrdersB = Selector('[data-tc="private-feed"]').withText('Organization B completed the Order').count

    await t
      .expect(completedOrdersA).eql(1)

    await t
      .expect(completedOrdersB).eql(1)

      .expect(Selector('[data-tc="private-feed"]').withText('Organization A you can now rate products and rate merchant').exists).ok()
      .expect(Selector('[data-tc="private-feed"]').withText('Organization B you can now rate products and rate merchant').exists).ok()

    const rateMerchantFeedA = Selector('[data-tc="private-feed"]').withText('Organization A you can now rate products and rate merchant').count
    const rateMerchantFeedB = Selector('[data-tc="private-feed"]').withText('Organization A you can now rate products and rate merchant').count

    await t
      .expect(rateMerchantFeedA).eql(1)

    await t
      .expect(rateMerchantFeedB).eql(1)


    .expect(Selector('[data-tc="private-feed"]').withText('Organization C accepted returning the').exists).ok()
})

test('Employee A checks his feed', async (t) => {
  await t
    .useRole(sellerA1Role)
    .navigateTo(myUrl + "/dashboard")

  await checkErrors()

  await t
    .expect(Selector('[data-tc="private-feed"]').withText(
      Anon.firstName + ' Anon successfully paid for the Order').exists).ok()
    .expect(Selector('[data-tc="private-feed"]').withText('Buyer Frank successfully paid for the Order').exists).ok()
    .expect(Selector('[data-tc="private-feed"]').withText('Buyer Frank cancelled the Order').exists).ok()
    .expect(Selector('[data-tc="private-feed"]').withText('Organization A delivered the Order').exists).ok()
    .expect(Selector('[data-tc="private-feed"]').withText('Organization A completed the Order').exists).ok()
    .expect(Selector('[data-tc="private-feed"]').withText('Organization A cancelled the Order').exists).ok()

  const feedUnitCount = Selector('[data-tc="private-feed"]').count

  await t
    .expect(feedUnitCount).gte(6)
})

test('Employee B checks his feed', async (t) => {
  await t
    .useRole(sellerB1Role)
    .navigateTo(myUrl + "/dashboard")

  await checkErrors()

  await t
    .expect(Selector('[data-tc="private-feed"]').withText('Organization B delivered the Order').exists).ok()
    .expect(Selector('[data-tc="private-feed"]').withText('Organization B completed the Order').exists).ok()

  const feedUnitCount = Selector('[data-tc="private-feed"]').count

})
