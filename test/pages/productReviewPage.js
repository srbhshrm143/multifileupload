import { Selector } from 'testcafe';

export default class ProductReviewPage {
    constructor() {
        this.url = '/dashboard/reviews/items/'
        this.title = Selector('.pagetitle').withText('Reviews')
        this.noReviewsTitle = Selector('h1').withText("You don't have any item reviews")
        this.tabs = {
          productsTab: Selector('ul li a').withText('Products'),
          merchantsTab: Selector('ul li a').withText('Merchants')
        }
        this.buttons = {
          addReview: Selector('a').withText('Add review')
        }
    }
}
