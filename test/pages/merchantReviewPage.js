import { Selector } from 'testcafe';

export default class MerchantReviewPage {
    constructor() {
        this.url = '/dashboard/reviews/organizations'
        this.title = Selector('.pagetitle').withText('Reviews')
        this.noReviewsTitle = Selector('h1').withText("You don't have any merchant reviews")
        this.tabs = {
          productsTab: Selector('ul li a').withText('Products'),
          merchantsTab: Selector('ul li a').withText('Merchants')
        }
        this.buttons = {
          addReview: Selector('a').withText('Add review')
        }
        this.stars = {
          one: Selector('[data-tc="rate-star"]').nth(0),
          two: Selector('[data-tc="rate-star"]').nth(1),
          three: Selector('[data-tc="rate-star"]').nth(2),
          four: Selector('[data-tc="rate-star"]').nth(3),
          five: Selector('[data-tc="rate-star"]').nth(4)
      }
    }
}
