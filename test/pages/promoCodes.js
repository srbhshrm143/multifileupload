import { Selector } from 'testcafe';

class PromoCodes {
  constructor() {
    this.url = '/dashboard/sell/promo_codes/'
    this.buttons = {
      addNewPromoCode: Selector('a').withText('Add new promo code'),
      delete: Selector('button[data-tc="promo-code-delete"]'),
      filters: Selector('button').withText('Filters'),
      showMore: Selector('a[data-tc="promo_code_show_more"]'),
      delete: Selector('button[data-tc="promo-code-delete"]')
    }
    this.promoCode = Selector('ul[data-tc="promo_code"]')
    this.promoCodes = {
      id: Selector('a[data-tc="promo_code_id"]'),
      value: Selector('li[data-tc="promo_code"]'),
      status: Selector('span[data-tc="promo_code_status"]'),
      usedBy: Selector('li[data-tc="promo_code_used_by"]')
    }
  }
}

export default new PromoCodes()
