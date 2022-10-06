import { Selector, ClientFunction, t } from 'testcafe'
import { buyerRole, adminRole, merchantRoleB, randomPersonRole, merchantRoleA, buyerRoleChanged } from './pages/roles'
import {
  myUrl,
  itemSearch,
  SellerMerchantB,
  SellerMerchantA
} from './pages/fixtures'

import { checkErrors, createGroup, waitForSelector, prepareForPressKey } from './pages/helper'


fixture`Chat`.skip.page(myUrl)

test.page(myUrl + '/search')('Chat to merchant', async (t) => {
  await t.useRole(buyerRoleChanged)
    .typeText(itemSearch.search.keyword, SellerMerchantA.item)
    .click(Selector('a').withText(SellerMerchantA.item))
    .click(Selector('a').withText('Contact seller'))
    .wait(3000)
    .typeText(Selector('input#chat-messageInput'), "Hi Merchant, i want to ask about " + SellerMerchantA.item)
    .pressKey('enter')
    .wait(1000)

    const failedConnectionMessage = Selector('div').withText('We cannot connect to the server')
    const message = Selector('p').withText('Hi Merchant, i want to ask about ' + SellerMerchantA.item)

    if (await failedConnectionMessage.exists) {
      await t
        .eval(() => location.reload(true));
      await t
        .wait(1000)
        .typeText(Selector('input#chat-messageInput'), "Hi Merchant, i want to ask about " + SellerMerchantA.item)
        .pressKey('enter')
    }


  if (!await message.exists) {
    await t
      .typeText(Selector('input#chat-messageInput'), "Hi Merchant, i want to ask about " + SellerMerchantA.item)
      .pressKey('enter')

    await t
      .expect(message.exists).ok()
  }
})

test('Chat to buyer by merchant', async (t) => {
  await t
    .useRole(merchantRoleA)
    .navigateTo(myUrl + '/inbox')
    .expect(Selector('a').withText('John Smith').exists).ok()
    .click(Selector('p').withText('John Smith'))
    .wait(3000)
    .typeText(Selector('input#chat-messageInput'), "Hi johnsmith, how we can help you?")
    .pressKey('enter')
    .wait(1000)

  const merchantMessage = Selector('p').withText('Hi johnsmith, how we can help you?')
  const failedConnectionMessage = Selector('div').withText('We cannot connect to the server')
  const message = Selector('p').withText('Hi Merchant, i want to ask about ' + SellerMerchantA.item)

  await t
    .eval(() => location.reload(true));

  while (await failedConnectionMessage.exists) {
    await t
      .eval(() => location.reload(true));
    await t
      .wait(1000)
      .typeText(Selector('input#chat-messageInput'), 'Hi johnsmith, how we can help you?')
      .pressKey('enter')
  }

  if (!await merchantMessage.exists) {
    await t
      .eval(() => location.reload(true));
    await t
      .typeText(Selector('input#chat-messageInput'), "Hi Merchant, i want to ask about " + SellerMerchantA.item)
      .pressKey('enter')

    await t
      .expect(merchantMessage.exists).ok()
      .expect(message.exists).ok()
  }
})

test('User who hasn\'t participated in any conversation have empty inbox', async (t) => {
  await t
  .useRole(randomPersonRole)
  .navigateTo(myUrl + '/inbox')

  //expects for empty inbox
  .expect(Selector('p').withText('You have not started any conversation yet').exists).ok()
  .expect(Selector('p').withText('To start one, find a person profile and use the ‘Send message’ button').exists).ok()

  .expect(Selector('a').withText('John Smith').exists).notOk()
})
