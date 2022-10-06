import { Selector } from 'testcafe';

export default class ProductReviewCreateForm {
    constructor() {
        this.title = Selector('.bigtitle')
        this.buttons = {
          saveReview: Selector('button').withText('Save review')
        }
        this.inputs = {
          description: Selector('textarea[placeholder="Product review (optional)"]'),
          benefits: Selector('input[name="item_review[pros]"]'),
          disadvantages: Selector('input[name="item_review[cons]"]')
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
