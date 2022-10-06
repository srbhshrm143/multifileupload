import { Selector } from 'testcafe';

export default class ProductReviewDetailsPage {
    constructor() {
        this.filledStar = Selector('svg').withAttribute('data-icon', 'starFull')
        this.emptyStar = Selector('svg').withAttribute('data-icon', 'star')
        this.inputs = {
          description: Selector('fieldset textarea'),
          benefits: Selector('#item_pros'),
          disadvantages: Selector('#item_cons')
        }
    }
}
