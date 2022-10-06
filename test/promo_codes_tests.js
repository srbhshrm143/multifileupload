import { Role, Selector } from 'testcafe'
import { sellerB1Role } from './pages/roles'
import {
  myUrl,
  promoCode,
  promoCodeSeeded,
} from './pages/fixtures'
import { checkErrors, } from './pages/helper'
import promoCodesPage from './pages/promoCodes'
import promoCodeCreateForm from './pages/promoCodesCreateForm'
import promoCodeDetailsPage from './pages/promoCodesDetailsPage'

fixture`Testing promo codes`
  .page(myUrl)
  .meta('concurrency', 'true')
  .beforeEach(async t => {
    await t.useRole(sellerB1Role)
    await t.navigateTo(promoCodesPage.url)

  })
  .afterEach(async t => {
    await t.useRole(Role.anonymous())
  })

test('Create promo code', async (t) => {
  await checkErrors()

  await t
    .click(promoCodesPage.buttons.addNewPromoCode)
    .typeText(promoCodeCreateForm.inputs.descriptionEn, promoCode.descriptionEn, { replace: true })

    .click(promoCodeCreateForm.labels.otherLanguage)
    .typeText(promoCodeCreateForm.inputs.descriptionOtherLang, promoCode.descriptionOtherLang, { replace: true })

  await t
    .typeText(promoCodeCreateForm.timeline.startDate, promoCode.startDate)
    .typeText(promoCodeCreateForm.timeline.endDate, promoCode.endDate)
    .typeText(promoCodeCreateForm.timeline.maxAvailableCodes, promoCode.maxAvailableCodes)
    .typeText(promoCodeCreateForm.timeline.maxTimesUserCanUse, promoCode.maxTimesUserCanUse)
    .typeText(promoCodeCreateForm.timeline.maxDiscountPerUser, promoCode.maxDiscountPerUser)

  await t
    .typeText(promoCodeCreateForm.discount.totalDiscount, promoCode.totalDiscount, { replace: true })
    .typeText(promoCodeCreateForm.discount.discountCap, promoCode.discountCap, { replace: true })

  await t
    .typeText(promoCodeCreateForm.inputs.promoCodeValue, promoCode.campaignCode, { replace: true })

  await t
    .click(promoCodeCreateForm.buttons.save)

  await t
    .click(promoCodesPage.buttons.showMore)

  await t
    .expect(promoCodeDetailsPage.offer.withText(promoCode.owner + " offers").exists).ok()
    .expect(promoCodeDetailsPage.organizationOffer.withText(promoCode.totalDiscount).exists).ok()

  await t
    .expect(promoCodeDetailsPage.inputs.englishDescription.withAttribute(
        'value', promoCode.descriptionEn).exists).ok()
    .click(promoCodeDetailsPage.secondLanguageTab)
    .expect(promoCodeDetailsPage.inputs.secondLanguageDescription.withAttribute(
        'value', promoCode.descriptionOtherLang).exists).ok()

  await t
    .expect(promoCodeDetailsPage.inputs.startDate.withAttribute('value', promoCode.startDate).exists).ok()
    .expect(promoCodeDetailsPage.inputs.endDate.withAttribute('value', promoCode.endDate).exists).ok()
    .expect(promoCodeDetailsPage.inputs.maxAvailableCodes.withAttribute(
        'value', promoCode.maxAvailableCodes).exists).ok()

  await t
    .expect(promoCodeDetailsPage.inputs.totalDiscount.withAttribute('value', promoCode.totalDiscount).exists).ok()
    .expect(promoCodeDetailsPage.inputs.discountCap.withAttribute('value', promoCode.discountCap).exists).ok()
})

test('Delete promo code', async (t) => {
  await t
   .setNativeDialogHandler(() => true)
   .click(Selector(`button[data-tc="promo-code-delete-${promoCodeSeeded.id}"]`))

  await
     checkErrors()

  await t
     .navigateTo(myUrl + promoCodesPage.url)

  await t
     .expect(promoCodesPage.buttons.showMore.withAttribute(
         'href', promoCodesPage.url + promoCodeSeeded.id).exists).notOk()
     .expect(promoCodesPage.promoCode.withText(promoCodeSeeded.descriptionEn).exists).notOk()
     .expect(promoCodesPage.promoCode.withText(promoCodeSeeded.value).exists).notOk()
})

