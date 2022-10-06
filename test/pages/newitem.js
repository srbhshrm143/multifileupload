import { Selector } from 'testcafe';

class NewItemForm {
  constructor() {
    this.buttons = {
      addMoreAttributes: Selector('button').withText('Add more Attributes'),
      addMoreFiles: Selector('div[data-variant-photos-modal-content] button.uppy-DashboardContent-addMore'),
      browseImages: Selector('button').withText('browse files'),
      createOrganization: Selector('button').withText('Create organization'),
      photos: Selector('.table-content-simple ul > li > button > svg[data-icon="camera"]'),
      submit: Selector('button').withText('Save'),
      uploadDone: Selector('div[data-variant-photos-modal] button').withText('Done'),
      uploadFiles: Selector('div[data-variant-photos-modal-content] button.uppy-StatusBar-actionBtn--upload'),
    }
    this.inputs = {
      name: Selector('#name_en'),
      nameOtherLang: Selector('#name_de'),
      description: Selector('#description_en'),
      descriptionOtherLang: Selector('#description_de'),
      imageUploadBox: Selector('div.uppy-Dashboard-AddFiles'),
      price: Selector('#price'),
      quantity: Selector('#quantity'),
      sku: Selector('#sku'),
      variantImage: Selector('div[data-variant-photos-modal-content] div.uppy-Dashboard-AddFiles input[name="files[]"]'),
      variantPrice: Selector('input[name="item[variants][][price]"]'),
      variantQuantity: Selector('input[name="item[variants][][quantity]"]'),
    }
    this.selectMenus = {
      attributeSelect: Selector('select[data-tc="select-attribute"]'),
      attributeColor: Selector('option[value="color"]'),
      itemType: Selector('#item_type'),
      itemTypeOption: Selector('#item_type > option'),
      option: Selector('input[type="checkbox"]'),
      optionSelect: Selector('[aria-controls="variant-popup"]'),
      option1: Selector('li').find('span').withText('black'),
      option2: Selector('li').find('span').withText('blue'),
    }
    this.variantsCheckbox = Selector('#item_variants')
    //this.variantsCheckbox = Selector('label[for="item_variants"]')
    this.englishTab = Selector('div.card > ul').child().nth(0)
    this.otherLanguageTab = Selector('div.card > ul').child().nth(1)
  }
}

export default new NewItemForm()
