import { Selector } from 'testcafe';

class PromoCodesCreateForm {
  constructor() {
    this.adminInputs = {
      isGlobalCheckbox: Selector('input[name="promo_code[is_global]"]'),
      marketPlaceOwnerFee: Selector('input[name="promo_code[mpo_cost_percent]"]'),
      merchantName: Selector('#merchant_name'),
      merchantSelect: Selector('input[name="promo_code[creator_id]"]'),
    }
    this.buttons = {
      save: Selector('button').withText('Save'),
    }
    this.discount = {
      discountCap: Selector('#upper_limit'),
      totalDiscount: Selector('#total_discount'),
    }
    this.inputs = {
      descriptionEn: Selector('#description_en'),
      descriptionOtherLang: Selector('#description_de'),
      promoCodeValue: Selector('#campaign_code')
    }
    this.labels = {
      englishLanguage: Selector('li').withText('ENGLISH'),
      otherLanguage: Selector('li').withText('GERMAN'),
    }
    this.timeline = {
      endDate: Selector('#end_date'),
      maxAvailableCodes: Selector('#max_available'),
      maxDiscountPerUser: Selector('#max_discount_amount_per_user'),
      maxTimesUserCanUse: Selector('#max_times_user_can_use'),
      startDate: Selector('#start_date'),
    }
  }
}

export default new PromoCodesCreateForm()
