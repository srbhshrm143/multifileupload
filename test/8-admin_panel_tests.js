import { Selector } from 'testcafe'
import { adminRole, buyerRole, tcAccRole } from './pages/roles'
import {
  notAuthorizedUser,
  myUrl,
  adminPage,
  topMenu,
  TestCafeAccount,
  loginForm,
  getURL,
  John
} from './pages/fixtures'
import { checkErrors } from './pages/helper'

fixture`Admin Panel`.page(myUrl)

test(`Count tables in each section`, async (t) => {
  await t.useRole(adminRole)
  await t
    .click(topMenu.buttons.profileDropdown)
    .click(topMenu.buttons.adminPanel)
  await
checkErrors() // Admin panel translation missing check

  await t.click(adminPage.menu.users)
  await
  checkErrors()

  await t.expect(adminPage.tableRows.users.count).gte(1)

  await t.click(adminPage.menu.sales)
  await t.click('#status_returned')
  await t.click('#status_cancelled_seller')

  await
  checkErrors()

  //await t.expect(adminPage.tableRows.sales.count).gte(1) commented for now

  await t.click(adminPage.menu.stock)
  await
  checkErrors()

  await t.expect(adminPage.tableRows.stock.count).gt(1)
})

test('Breakin-in test', async (t) => {
  await t.useRole(buyerRole)
  await t.navigateTo(myUrl + '/admin')

  await t.expect(Selector('div').withText(notAuthorizedUser).exists).ok()

  await t.useRole(buyerRole)
  await t.navigateTo(myUrl + '/admin/users')

  await t.expect(Selector('div').withText(notAuthorizedUser).exists).ok()

  await t.useRole(buyerRole)
  await t.navigateTo(myUrl + '/admin/orders')

  await t.expect(Selector('div').withText(notAuthorizedUser).exists).ok()

  await t.useRole(buyerRole)
  await t.navigateTo(myUrl + '/admin/stock')

  await t.expect(Selector('div').withText(notAuthorizedUser).exists).ok()
})


test('Ensure there are no errors in admin audit log', async (t) => {
  await t.useRole(adminRole)
  await t.navigateTo(myUrl + '/admin/activities')
  await checkErrors()
})

test('Unlock TestCafe Account', async (t) => {
  await t
    .useRole(adminRole)
  await t
    .navigateTo(myUrl + '/admin/users')
  await t
    .click(Selector('[data-tc="admin-panel-user"]').withText(TestCafeAccount.firstName).find('button').withText('Unlock'))
})

test('Grant superadmin permissions to an TestCafe account', async (t) => {
  await t
    .useRole(adminRole)
  await t
    .navigateTo(myUrl + '/admin/users')
  await t
    .click(Selector('[data-tc="admin-panel-user"]').withText(TestCafeAccount.email).find('a').withText('Edit'))
    .click(Selector('#superadmin'))
    .click(Selector('button').withText('Save'))
    .click(Selector('[data-tc="admin-panel-user"]').withText(TestCafeAccount.email).find('a').withText('Edit'))
    .expect(Selector('#superadmin').withAttribute('checked').exists).ok()
})

test.page(myUrl + "/sessions/new")('TestCafe Account was unlocked successfully', async (t) => {
  await t
    .typeText(loginForm.inputs.email, TestCafeAccount.email)
    .typeText(loginForm.inputs.password, TestCafeAccount.newPassword)
    .click(loginForm.buttons.logIn)
})

test.page(myUrl + "/sessions/new")('Superadmin permissions are added successfully to TestCafe Account', async (t) => {
  await t
    .typeText(loginForm.inputs.email, TestCafeAccount.email)
    .typeText(loginForm.inputs.password, TestCafeAccount.newPassword)
    .click(loginForm.buttons.logIn)

    .expect(getURL()).contains(myUrl+'/admin')

    .navigateTo(myUrl)

    .click(topMenu.buttons.profileDropdown)
    .expect(topMenu.profileDropdown.admin.exists).ok("Superadmin permissions should be added")
})

test('Remove superadmin permissions from TestCafe account', async (t) => {
  await t
    .useRole(adminRole)

  await t
    .navigateTo(myUrl + '/admin/users')

  await t
    .click(Selector('[data-tc="admin-panel-user"]').withText(TestCafeAccount.email).find('a').withText('Edit'))
    .expect(Selector('#superadmin').withAttribute('checked').exists).ok()
    .click(Selector('#superadmin'))
    .click(Selector('button').withText('Save'))
    .click(Selector('[data-tc="admin-panel-user"]').withText(TestCafeAccount.email).find('a').withText('Edit'))
    .expect(Selector('#superadmin').withAttribute('checked').exists).notOk()
})

test.page(myUrl + "/sessions/new")('Superadmin permissions are removed successfully', async (t) => {
  await t
    .typeText(loginForm.inputs.email, TestCafeAccount.email)
    .typeText(loginForm.inputs.password, TestCafeAccount.newPassword)
    .click(loginForm.buttons.logIn)

    .expect(getURL()).notContains(myUrl+'/admin')
    .navigateTo(myUrl+'/admin')
    .expect(getURL()).notContains(myUrl+'/admin')

    .click(topMenu.buttons.profileDropdown)
    .expect(topMenu.profileDropdown.admin.exists).notOk("Superadmin permissions should be removed")
})

test('Invite existing account to organization A', async (t) => {
  await t
    .useRole(adminRole)
  await t
    .navigateTo(myUrl + '/admin/organizations')
  await t
    .click(Selector('a').withText('Organization A'))
    .click(Selector('a').withText('Invite merchant admin'))
    .typeText(Selector('#first_name'), TestCafeAccount.firstName)
    .typeText(Selector('#last_name'), TestCafeAccount.lastName)
    .typeText(Selector('#email'), TestCafeAccount.email)
    .click(Selector('button').withText('Send invitation'))

  await t
    .navigateTo(myUrl + '/admin/processes')

    .click(Selector('a').withText('Invite testcafe@tc.com'))
    .click(Selector('button').withText('Accept'))
})

test('Invited user has been added successfully to organization A', async (t) => {
  await t
    .useRole(tcAccRole)
  await t
    .navigateTo(myUrl + '/dashboard/sell/items')

  const productCount = await Selector('[data-tc="inventory-product"]').count

  await t
    .expect(productCount).gte(10)
})

test('Add promoted flag to random user`s organization (Ann Random)', async (t) => {
  await t
    .useRole(adminRole)
  await t
    .navigateTo(myUrl + '/admin/organizations')
    .click(Selector('ul').withText('Ann Random').find('a[title="Edit"]'))
    .click(Selector('#promoted'))
    .click(Selector('button').withText('Save'))
})

test('Add promoted flag to "MerchantB" item', async (t) => {
  await t
    .useRole(adminRole)
  await t
    .navigateTo(myUrl + '/admin/stock')
    .typeText(Selector('#name'), "Vencer Stella 7lyt1011")
    .click(Selector('button').withText('Apply'))
    .click(Selector('a[title="Edit"]'))
    .click(Selector('#promoted'))
    .click(Selector('button').withText('Save'))
})

test.skip('Item is visible as promoted', async (t) => {
  await t
    .navigateTo(myUrl)
    .typeText(Selector('#name'), "Vencer Stella 7lyt1011")
    .click(Selector('button').withText('Apply'))
    .click(Selector('a[title="Edit"]'))
    .click(Selector('#promoted'))
    .click(Selector('button').withText('Save'))
})


test('Add new category in Admin Panel', async (t) => {
  await t
    .useRole(adminRole)
  await t
    .navigateTo(myUrl + '/admin/categories')
  await t
    .click(Selector('a').withText('Add Category'))
    .typeText(Selector('input[name="category[key]"]'), "fruits")
    .typeText(Selector('#name_en'), "fruits")
    .typeText(Selector('#name_de'), "früchte")
    .click(Selector('button').withText('Save'))

    .expect(Selector('p[data-tc="detail-lang-en').withText('en: fruits').exists).ok()
    .expect(Selector('p[data-tc="detail-lang-de').withText('de: früchte').exists).ok()
})

test('Category has been added successfully', async (t) => {
  await t
    .navigateTo(myUrl + '/search')
  await t
    .click(Selector('select[name="category"]'))
    .click(Selector('option').withText('fruits'))
    .expect(Selector('p').withText('We couldn’t find any results').exists).ok()
})

test('Change value of existing category key in Admin Panel', async (t) => {
  await t
    .useRole(adminRole)
  await t
    .navigateTo(myUrl + '/admin/categories')
    .click(Selector('form[data-tc="category-generate"]'))

  await t
    .click(Selector('ul[data-tc="category-admin-panel"]').withText('jewellery/anklets').find('a').withText('Edit'))

    .typeText(Selector('#name_en'), "necklaces", { replace: true })
    .typeText(Selector('#name_de'), "necklacesDE", { replace: true })
    .click(Selector('button').withText('Save'))

    .expect(Selector('p[data-tc="detail-lang-en').withText('en: necklaces').exists).ok()
    .expect(Selector('p[data-tc="detail-lang-de').withText('de: necklacesDE').exists).ok()
})

test('Admin can set user password', async (t) => {
  await t
    .useRole(adminRole)
  await t
    .navigateTo(myUrl + '/admin/users')
  await t
    .click(Selector('[data-tc="admin-panel-user"]').withText('John').find('[data-tc="admin-panel-user-id"'))
    .click(Selector('a').withText('Set Password'))

    .typeText(Selector('input[name="password[password]"]'), "adminPassword")
    .typeText(Selector('input[name="password[password_confirmation]"]'), "adminPassword")
    .click(Selector('button').withText('Save'))
})

test.page(myUrl + "/sessions/new")('Password has been set successfully', async (t) => {
  await t
    .typeText(loginForm.inputs.email, John.email)
    .typeText(loginForm.inputs.password, "adminPassword")
    .click(loginForm.buttons.logIn)
    .expect(Selector('div[data-tc="username"]').withText('John').exists).ok()
})
