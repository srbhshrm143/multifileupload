import { Selector } from 'testcafe';

class AdminCategoriesPage {
  constructor() {
    this.url = '/admin/categories/',
    this.category = Selector('ul[data-tc="category-admin-panel"]')
    this.categoryUrl = Selector('ul[data-tc="category-admin-panel"]').find('a')
    this.buttons = {
      addCategory: Selector('a').withText('Add Category'),
      generate: Selector('form[data-tc="category-generate"]'),
      save: Selector('button').withText('Save'),
      edit: Selector('a[data-tc="category-edit"]')
    }
    this.inputs = {
      key: Selector('input[name="category[key]"]'),
      nameEn: Selector('#name_en'),
      nameSecondLanguage: Selector('#name_de')
    }
    this.details = {
      englishLanguage: Selector('p[data-tc="detail-lang-en'),
      secondLanguage: Selector('p[data-tc="detail-lang-de')
    }
  }
}

export default new AdminCategoriesPage()
