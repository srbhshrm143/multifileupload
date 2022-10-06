import { Selector, ClientFunction, t } from 'testcafe'
import { buyerRole, adminRole, merchantRoleB, randomPersonRole, merchantRoleA, buyerRoleChanged } from './pages/roles'
import {
  myUrl,
  itemSearch,
  SellerMerchantB,
  SellerMerchantA,
  topMenu,
  challengePage
} from './pages/fixtures'

import { checkErrors, createGroup, waitForSelector, prepareForPressKey } from './pages/helper'


fixture`Challenges`.page(myUrl)

test.page(myUrl + '/search')('Add new challenge', async (t) => {
  await t.useRole(adminRole)
    .navigateTo(myUrl)
    .click(topMenu.buttons.addDropdown)
    .click(topMenu.addDropdown.addChallenge)

    .typeText(challengePage.inputs.challengeName, "challenge name")
    .typeText(challengePage.inputs.shortDescription, "short description")
    .click(challengePage.buttons.createChallenge)
})
