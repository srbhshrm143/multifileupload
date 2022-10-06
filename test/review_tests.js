import { Selector } from 'testcafe'
import { buyer2Role, randomPersonRole } from './pages/roles'
import { item, myUrl, sellerA1, sellerB1, topMenu, productReviewPage,
   merchantReviewPage, productReviewCreateForm, merchantReviewCreateForm,
    productReview, merchantReview, productReviewSeeded, merchantReviewSeeded, productReviewDetailsPage } from './pages/fixtures'
import { checkErrors } from './pages/helper'
import ProductReviewDetailsPage from './pages/productReviewDetailsPage'

fixture`Reviews`
  .page(myUrl)
  .meta('concurrency', 'true')

test('User who hasn`t placed any order have empty lists', async (t) => {
  await t
    .useRole(randomPersonRole)
    .click(topMenu.buttons.profileDropdown)
    .click(topMenu.profileDropdown.reviews)

  checkErrors()

  await t
    .expect(productReviewPage.noReviewsTitle.exists).ok()
    .click(productReviewPage.tabs.merchantsTab)

  checkErrors()

  await t
    .expect(merchantReviewPage.noReviewsTitle.exists).ok()
})

test("Buyer can put a product's review to order that he have placed before", async (t) => {
  await t
    .useRole(buyer2Role)
    .navigateTo(myUrl + productReviewPage.url)

  const possibleReview = Selector('ul[data-tc="review-' + sellerB1.reviewItemId + '"]').find('li').withText('Add review')

  await t
    .click(possibleReview)

  await t
    checkErrors()

  await t
    .click(productReviewCreateForm.stars.three)

  await t
    .typeText(productReviewCreateForm.inputs.description, productReview.description, { paste: true })
    .typeText(productReviewCreateForm.inputs.benefits, productReview.benefits, { paste: true })
    .typeText(productReviewCreateForm.inputs.disadvantages, productReview.disadvantages, { paste: true })

  await t
    .click(productReviewCreateForm.buttons.saveReview)
})

test("Buyer can put a review to merchant, who sold items to him", async (t) => {
  await t
    .useRole(buyer2Role)
    .navigateTo(myUrl + merchantReviewPage.url)

  await t
    .click(merchantReviewPage.tabs.merchantsTab)

    const addReviewButton = Selector('ul[data-tc="review-' + sellerB1.reviewMerchantId + '"]').find('li').withText('Add review')

  await t
    .expect(addReviewButton.exists).ok()
    .hover(addReviewButton)
    .click(addReviewButton)
    .debug()

  await t
    checkErrors()

  await t
    .expect(merchantReviewCreateForm.buttons.recommendMerchant.exists).ok()

  await t
    .expect(merchantReviewCreateForm.buttons.recommendMerchant.exists).ok()

  await t
    .hover(merchantReviewCreateForm.buttons.recommendMerchant)

  await t
    .click(merchantReviewCreateForm.buttons.recommendMerchant)

  await t
    .click(merchantReviewCreateForm.rateCompilance.three)
    .click(merchantReviewCreateForm.rateDelivery.four)
    .click(merchantReviewCreateForm.rateService.five)

  await t
    .typeText(merchantReviewCreateForm.inputs.description, merchantReview.description, { paste: true })

  await t
    .click(merchantReviewCreateForm.buttons.saveReview)
})


test("Buyer can see a review, which he added to the product", async (t) => {
  await t
    .useRole(buyer2Role)
    .navigateTo(myUrl + productReviewPage.url)

  const possibleReview = Selector('a').withAttribute('href', productReviewPage.url + productReviewSeeded.id)

  await t
    .click(possibleReview)

  await t
    checkErrors()

  await t
    .expect(productReviewDetailsPage.filledStar.count).eql(productReviewSeeded.rateAmount)
    .expect(productReviewDetailsPage.emptyStar.count).eql(productReviewSeeded.emptyStars)
    .expect(productReviewDetailsPage.inputs.description.withText(productReviewSeeded.description).exists).ok()
    .expect(productReviewDetailsPage.inputs.benefits.withAttribute('value', productReviewSeeded.benefits).exists).ok()
    .expect(productReviewDetailsPage.inputs.disadvantages.withAttribute('value', productReviewSeeded.disadvantages).exists).ok()
})
