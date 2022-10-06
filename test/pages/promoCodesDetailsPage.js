import { Selector } from 'testcafe';

class PromoCodesDetailsPage {
    constructor() {
      this.adminInputs = {
        marketPlaceOwnerFee: Selector("#mpo_cost_percent"),
        merchantSelect: Selector('input[name="promo_code[creator_id]"]'),
        isGlobalCheckbox: Selector('input[name="promo_code[is_global]"]')
      }
      this.englishTab = Selector('li').withText('ENGLISH')
      this.secondLanguageTab = Selector('li').withText('GERMAN')
      this.inputs = {
        discountCap: Selector('input[name="promo_code[upper_limit]"]'),
        englishDescription: Selector('input[name="promo_code[details][en][description]"]'),
        endDate: Selector('input[name="promo_code[end_date]"]'),
        secondLanguageDescription: Selector('input[name="promo_code[details][de][description]"]'),
        maxAvailableCodes: Selector('input[name="promo_code[max_available]"]'),
        promoCodeValue: Selector('input[name="promo_code[code]"]'),
        startDate: Selector('input[name="promo_code[start_date]"]'),
        totalDiscount: Selector('input[name="promo_code[total_discount]"]'),
      }
      this.offer = Selector('div.subtitle')
      this.organizationOffer = Selector('div.bigtitle')
      this.offerTitle = "offers"
    }
}

export default new PromoCodesDetailsPage()
