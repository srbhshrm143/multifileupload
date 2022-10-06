import { Selector } from 'testcafe'
import { adminRole } from './pages/roles'
import {
  myUrl
} from './pages/fixtures'

fixture`Set constants by admin`.page(myUrl)

test('Set expiration time for unpaid order (~5 seconds)', async (t) => {
  await t.useRole(adminRole)
  .navigateTo(myUrl + '/admin/setup')
  .typeText(Selector('#order-cancel-setup'), '0.0010', { replace: true })
  .click(Selector('#order-cancel-setup + button'))
})

test('Disable chat by admin', async (t) => {
  await t.useRole(adminRole)
  .navigateTo(myUrl + '/admin/setup')
  //.click(Selector('#chatOn'))
  .click(Selector('#chatOn'))
  .click(Selector('#chat button'))
})

test('Lock account after three failed attempts', async (t) => {
  await t.useRole(adminRole)
  .navigateTo(myUrl + '/admin/setup')
  .typeText(Selector('[data-tc="login_attempts_counter"]'), "3", { replace : true })
  .click(Selector('#login_attempts_counter + button'))
  .typeText(Selector('[data-tc="login_attempts_unlock_after_mins"]'), "12", { replace : true })
  .click(Selector('#login_attempts_unlock_after_mins + button'))
})
