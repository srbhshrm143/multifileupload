import { Selector } from 'testcafe';

class PromoCodesAdminPage {
    constructor() {
        this.url = '/admin/promo_codes/'
        this.buttons = {
          addPromoCode: Selector('a').withAttribute('href', '/admin/promo_codes/new'),
          showMore: Selector('a[data-tc="promo_code_show_more"]')
        }
        this.promoCode = Selector('ul[data-tc="promo_code"]')
        this.isGlobal = Selector('ul[data-tc="promo_code"]').find('input').withAttribute('checked')
    }
}

export default new PromoCodesAdminPage()
