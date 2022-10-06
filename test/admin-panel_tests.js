import { Role, Selector } from 'testcafe'
import { adminRole, newSuperAdminRole, randomPersonRole } from './pages/roles'
import {
  categoryToCreate,
  categoryToEdit,
  getURL,
  globalPromoCode,
  globalPromoCodeSeeded,
  myUrl,
  newSuperAdmin,
  organizationToInviteTo,
  RandomPerson,
  topMenu,
  variantAttributeValues,
} from './pages/fixtures'
import { addAttributeValue, checkErrors, } from './pages/helper'
import adminCategoriesPage from '../test/pages/admin/adminCategories'
import adminOrganizationsPage from '../test/pages/admin/adminOrganizations'
import adminPage from '../test/pages/adminp'
import adminProcessesPage from '../test/pages/admin/adminProcesses'
import adminSettingsPage from '../test/pages/admin/adminSettings'
import adminUsersPage from '../test/pages/admin/adminUsers'
import promoCodeAdminPage from './pages/promoCodesAdminPage'
import promoCodeCreateForm from './pages/promoCodesCreateForm'
import promoCodeDetailsPage from './pages/promoCodesDetailsPage'


fixture`Testing Admin dashboard`
  .page(myUrl)
  .meta('concurrency', 'true')
  .beforeEach(async t => {
    await t
      .useRole(adminRole)
      .navigateTo(myUrl + '/admin')
  })
  .afterEach(async t => {
    await t.useRole(Role.anonymous())
  })

test('Set 2FA On/Off', async (t) => {
  await t
    .navigateTo(myUrl + adminSettingsPage.url)
    .click(adminSettingsPage.twoFactorAuthentication.enabled)
    .click(adminSettingsPage.twoFactorAuthentication.save)

  await t
    .expect(adminSettingsPage.twoFactorAuthentication.enabled.withAttribute('checked').exists).ok()

  await t
    .click(adminSettingsPage.twoFactorAuthentication.disabled)
    .click(adminSettingsPage.twoFactorAuthentication.save)

  await t
    .expect(adminSettingsPage.twoFactorAuthentication.disabled.withAttribute('checked').exists).ok()
})

test('Set hCAPTCHA On/Off', async (t) => {
  await t
    .navigateTo(myUrl + adminSettingsPage.url)
    .click(adminSettingsPage.hCaptcha.enabled)
    .click(adminSettingsPage.hCaptcha.save)

  await t
    .expect(adminSettingsPage.hCaptcha.enabled.withAttribute('checked').exists).ok()

  await t
    .click(adminSettingsPage.hCaptcha.disabled)
    .click(adminSettingsPage.hCaptcha.save)

  await t
    .expect(adminSettingsPage.hCaptcha.disabled.withAttribute('checked').exists).ok()
})

test('Set expiration time for unpaid order (~1 second)', async (t) => {
  await t
    .navigateTo(myUrl + adminSettingsPage.url)
    .typeText(adminSettingsPage.cancelUnpaidOrders.input, '0.00025', {replace: true})
    .click(adminSettingsPage.cancelUnpaidOrders.save)
    .expect(adminSettingsPage.cancelUnpaidOrders.input.value).eql('0.00025')
})

test('Enable chat', async (t) => {
  await t
    .navigateTo(myUrl + adminSettingsPage.url)
    .click(adminSettingsPage.chat.enabled)
    .click(adminSettingsPage.chat.save)
    .expect(adminSettingsPage.chat.enabled.checked).ok()
})

test('Grant superadmin permissions to a user, and then remove them', async (t) => {
  await t
    .navigateTo(myUrl + adminUsersPage.url)
    .click(Selector('a[href="' + adminUsersPage.url + newSuperAdmin.id + '/permissions"]'))
    .click(adminUsersPage.flags.superAdmin)
    .click(adminUsersPage.buttons.save)
    .click(Selector('a[href="' + adminUsersPage.url + newSuperAdmin.id + '/permissions"]'))
    .expect(adminUsersPage.flags.superAdmin.withAttribute('checked').exists).ok()
    .useRole(Role.anonymous())

  await t
    .useRole(newSuperAdminRole)
    .navigateTo(myUrl + adminUsersPage.url)
    .click(adminPage.menu.backToHomepage)
    .click(topMenu.buttons.profileDropdown)
    .expect(topMenu.profileDropdown.admin.exists).ok("Superadmin permissions should be added")
    .useRole(Role.anonymous())

  await t
    .useRole(adminRole)
    .navigateTo(myUrl + adminUsersPage.url)
    .click(Selector('a[href="' + adminUsersPage.url + newSuperAdmin.id + '/permissions"]'))
    .expect(adminUsersPage.flags.superAdmin.withAttribute('checked').exists).ok()
    .click(adminUsersPage.flags.superAdmin)
    .click(adminUsersPage.buttons.save)
    .click(Selector('a[href="' + adminUsersPage.url + newSuperAdmin.id + '/permissions"]'))
    .expect(adminUsersPage.flags.superAdmin.withAttribute('checked').exists).notOk()
    .useRole(Role.anonymous())

  await t
    .useRole(newSuperAdminRole)
    .expect(getURL()).notContains(myUrl + '/admin')
    .navigateTo(myUrl + '/admin')
    .expect(getURL()).notContains(myUrl + '/admin')
    .click(topMenu.buttons.profileDropdown)
    .expect(topMenu.profileDropdown.admin.exists).notOk("Superadmin permissions should be removed")
})

test('Invite a user to an organization', async (t) => {
  await t
    .navigateTo(myUrl + adminOrganizationsPage.url)
    .click(adminOrganizationsPage.organization.withText(organizationToInviteTo))
    .click(adminOrganizationsPage.buttons.inviteMerchantAdmin)
    .typeText(adminOrganizationsPage.inputs.firstName, RandomPerson.firstName)
    .typeText(adminOrganizationsPage.inputs.lastName, RandomPerson.lastName)
    .typeText(adminOrganizationsPage.inputs.email, RandomPerson.email)
    .click(adminOrganizationsPage.buttons.sendInvitation)

  await t
    .navigateTo(myUrl + adminProcessesPage.url)
    .click(Selector('a').withText('Invite ' + RandomPerson.email))
    .click(adminProcessesPage.buttons.accept)
    .useRole(Role.anonymous())

  await t
    .useRole(randomPersonRole)
    .navigateTo(myUrl + '/dashboard/sell/items')

  const productCount = await Selector('[data-tc="inventory-product"]').count

  await t
    .expect(productCount).gte(10)
})

test('Add new category in Admin Panel', async (t) => {
  await t
    .navigateTo(myUrl + adminCategoriesPage.url)
  await t
    .click(adminCategoriesPage.buttons.addCategory)
    .typeText(adminCategoriesPage.inputs.key, categoryToCreate.english, { replace: true })
    .typeText(adminCategoriesPage.inputs.nameEn, categoryToCreate.english, { replace: true })
    .typeText(adminCategoriesPage.inputs.nameSecondLanguage, categoryToCreate.secondLanguage, { replace: true })
    .click(adminCategoriesPage.buttons.save)

  await t
    .expect(adminCategoriesPage.categoryUrl.withAttribute('href', '/categories/' + categoryToCreate.english).exists).ok()
    .expect(adminCategoriesPage.details.englishLanguage.withText('en: ' + categoryToCreate.english).exists).ok()
    .expect(adminCategoriesPage.details.secondLanguage.withText('de: '  + categoryToCreate.secondLanguage).exists).ok()
})

test('Change value of existing category key in Admin Panel', async (t) => {
  await t
    .useRole(adminRole)
  await t
    .navigateTo(myUrl + adminCategoriesPage.url)
    .click(adminCategoriesPage.buttons.generate)

  await t
    .click(Selector(adminCategoriesPage.category).withText('jewellery/anklets').find('a').withText('Edit'))

    .typeText(adminCategoriesPage.inputs.nameEn, categoryToEdit.english, { replace: true })
    .typeText(adminCategoriesPage.inputs.nameSecondLanguage, categoryToEdit.secondLanguage, { replace: true })
    .click(adminCategoriesPage.buttons.save)

  await t
    .expect(adminCategoriesPage.details.englishLanguage.withText('en: ' + categoryToEdit.english).exists).ok()
    .expect(adminCategoriesPage.details.secondLanguage.withText('de: '  + categoryToEdit.secondLanguage).exists).ok()
})

test('Create item attributes', async (t) => {
  await t
    .navigateTo(myUrl + '/admin/items')
    .click(adminPage.stock.editItemAttributesLink)
    .click(adminPage.stock.addAttributeButton)
    .typeText(adminPage.stock.attrNameInput, "length")
    .typeText(adminPage.stock.attrEnInput, "length")
    .typeText(adminPage.stock.attrDeInput, "Länge")

  const variants = variantAttributeValues
  for (let [index, variant] of variants.entries()) {
    await addAttributeValue(index.toString(), 'en', 'de', variant.value, variant.valueLang1, variant.valueLang2)
  }

  await t
    .click(adminPage.stock.saveButton)
    .expect(Selector('img[alt="Server error"]').exists).notOk()
    .expect(Selector('ul[data-tc="item_attribute-admin-panel"] > li').withText('color').exists).ok()
})

test('Create global promo code', async (t) => {
  await t
    .click(Selector('a').withAttribute('title', 'Promo Codes'))

  await t
    .click(promoCodeAdminPage.buttons.addPromoCode)

  await t
    .typeText(promoCodeCreateForm.inputs.descriptionEn, globalPromoCode.descriptionEn,
        { paste:true, replace: true })

    .click(promoCodeCreateForm.labels.otherLanguage)
    .typeText(promoCodeCreateForm.inputs.descriptionOtherLang, globalPromoCode.descriptionOtherLang,
        { paste: true, replace: true })

  await t
    .typeText(promoCodeCreateForm.timeline.startDate, globalPromoCode.startDate)
    .typeText(promoCodeCreateForm.timeline.endDate, globalPromoCode.endDate)
    .typeText(promoCodeCreateForm.timeline.maxAvailableCodes, globalPromoCode.maxAvailableCodes)
    .typeText(promoCodeCreateForm.timeline.maxTimesUserCanUse, globalPromoCode.maxTimesUserCanUse)
    .typeText(promoCodeCreateForm.timeline.maxDiscountPerUser, globalPromoCode.maxDiscountPerUser)

  await t
    .typeText(promoCodeCreateForm.discount.totalDiscount, globalPromoCode.totalDiscount,
        { paste: true, replace: true })
    .typeText(promoCodeCreateForm.discount.discountCap, globalPromoCode.discountCap,
        { paste: true, replace: true })

  await t
    .typeText(promoCodeCreateForm.adminInputs.marketPlaceOwnerFee, globalPromoCode.marketPlaceOwnerFee)
    .click(promoCodeCreateForm.adminInputs.isGlobalCheckbox)

  await t
    .typeText(promoCodeCreateForm.adminInputs.merchantName, globalPromoCode.merchantName,
        { paste: true, replace: true })
    .typeText(promoCodeCreateForm.inputs.promoCodeValue, globalPromoCode.campaignCode,
        { paste: true, replace: true })

  await t
    .click(promoCodeCreateForm.buttons.save)

  await t
    .expect(promoCodeAdminPage.promoCode.withText(globalPromoCode.descriptionEn).exists).ok()
    .expect(promoCodeAdminPage.promoCode.withText(globalPromoCode.code).exists).ok()
    .expect(promoCodeAdminPage.promoCode.withText(globalPromoCode.codeTypes.global).exists).ok()

  await t
    .click(promoCodeAdminPage.buttons.showMore)

  await t
    //.expect(promoCodeDetailsPage.offer.withText(globalPromoCode.owner + " " + globalPromoCode.offerTitle).exists).ok()
    .expect(promoCodeDetailsPage.organizationOffer.withText(globalPromoCode.totalDiscount).exists).ok()

  await t
    .expect(promoCodeDetailsPage.inputs.englishDescription.withAttribute(
        'value', globalPromoCode.descriptionEn).exists).ok()

  await t
    .click(promoCodeDetailsPage.secondLanguageTab)

  await t
    .expect(promoCodeDetailsPage.inputs.secondLanguageDescription.withAttribute(
        'value', globalPromoCode.descriptionOtherLang).exists).ok()

  await t
    .expect(promoCodeDetailsPage.inputs.startDate.withAttribute('value', globalPromoCode.startDate).exists).ok()
    .expect(promoCodeDetailsPage.inputs.endDate.withAttribute('value', globalPromoCode.endDate).exists).ok()
    .expect(promoCodeDetailsPage.inputs.maxAvailableCodes.withAttribute(
        'value', globalPromoCode.maxAvailableCodes).exists).ok()
    .expect(promoCodeDetailsPage.inputs.totalDiscount.withAttribute(
        'value', globalPromoCode.totalDiscount).exists).ok()
    .expect(promoCodeDetailsPage.inputs.discountCap.withAttribute(
        'value', globalPromoCode.discountCap).exists).ok()

  await t
    .expect(promoCodeDetailsPage.adminInputs.marketPlaceOwnerFee.value).eql(globalPromoCode.marketPlaceOwnerFee)
    .expect(promoCodeDetailsPage.adminInputs.isGlobalCheckbox.exists).ok()
})

test('Delete global promo code', async (t) => {
  await t
    .click(Selector('a').withAttribute('title', 'Promo Codes'))

  await t
   .setNativeDialogHandler(() => true)
   .click(Selector(`button[data-tc="promo-code-delete-${globalPromoCodeSeeded.id}"]`))

  await
    checkErrors()

  await t
    .expect(promoCodeAdminPage.promoCode.withText(globalPromoCodeSeeded.descriptionEn).exists).notOk()
    .expect(promoCodeAdminPage.promoCode.withText(globalPromoCodeSeeded.code).exists).notOk()

  await t
    .expect(promoCodeAdminPage.buttons.showMore.withAttribute(
        'href', promoCodeAdminPage.url + globalPromoCodeSeeded.id).exists).notOk()
})
