import { Selector } from 'testcafe';

export default class MerchantReviewCreateForm {
    constructor() {
      this.buttons = {
        recommendMerchant: Selector('div[data-tc="recommend-merchant"]'),
        dontRecommendMerchant: Selector('div[data-tc="recommend-merchant"]').nth(1),
        saveReview: Selector('button').withText('Save review')
      }
      this.inputs = {
        description: Selector('textarea[placeholder="Describe the merchant based on your experience (optional)"]'),
      }
      this.rateTitle = Selector('.bigtitle').withText('How do you rate this purchase?')
      this.recommendTitle = Selector('.subtitle').withText('Would you recommend this merchant?')
      this.rateCompilance = {
        one: Selector('fieldset[data-tc="compilance-rating"]').find('button[data-tc="rate-star"]').nth(0),
        two: Selector('fieldset[data-tc="compilance-rating"]').find('button[data-tc="rate-star"]').nth(1),
        three: Selector('fieldset[data-tc="compilance-rating"]').find('button[data-tc="rate-star"]').nth(2),
        four: Selector('fieldset[data-tc="compilance-rating"]').find('button[data-tc="rate-star"]').nth(3),
        five: Selector('fieldset[data-tc="compilance-rating"]').find('button[data-tc="rate-star"]').nth(4),
      }
      this.rateDelivery = {
        one: Selector('fieldset[data-tc="delivery-rating"]').find('button[data-tc="rate-star"]').nth(0),
        two: Selector('fieldset[data-tc="delivery-rating"]').find('button[data-tc="rate-star"]').nth(1),
        three: Selector('fieldset[data-tc="delivery-rating"]').find('button[data-tc="rate-star"]').nth(2),
        four: Selector('fieldset[data-tc="delivery-rating"]').find('button[data-tc="rate-star"]').nth(3),
        five: Selector('fieldset[data-tc="delivery-rating"]').find('button[data-tc="rate-star"]').nth(4),
      }
      this.rateService = {
        one: Selector('fieldset[data-tc="service-rating"]').find('button[data-tc="rate-star"]').nth(0),
        two: Selector('fieldset[data-tc="service-rating"]').find('button[data-tc="rate-star"]').nth(1),
        three: Selector('fieldset[data-tc="service-rating"]').find('button[data-tc="rate-star"]').nth(2),
        four: Selector('fieldset[data-tc="service-rating"]').find('button[data-tc="rate-star"]').nth(3),
        five: Selector('fieldset[data-tc="service-rating"]').find('button[data-tc="rate-star"]').nth(4)
      }
      this.title = Selector('.bigtitle')
    }
}
