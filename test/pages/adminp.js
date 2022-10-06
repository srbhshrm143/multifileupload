import { Selector } from 'testcafe';

class AdminPanel {
  constructor() {
    this.menu = {
      backToHomepage: Selector('a').withAttribute('title', 'Back to homepage'),
      home: Selector('nav a').withAttribute('title', 'Dashboard'),
      itemAttributes: Selector('nav a').withAttribute('title', 'Edit item attributes'),
      organizations: Selector('nav a').withAttribute('title', 'Merchants'),
      processes: Selector('nav a').withAttribute('title', 'Approval Processes'),
      sales: Selector('nav a').withAttribute('title', 'Sales'),
      settings: Selector('nav a').withAttribute('title', 'Settings'),
      stock: Selector('nav a').withAttribute('title', 'Stock'),
      users: Selector('nav a').withAttribute('title', 'Users')
    }
    this.tableRows = {
      sales: Selector('section.table .table-content ul'),
      stock: Selector('section.table .table-content ul'),
      users: Selector('section.table .table-content ul')
    }
    this.stock = {
      editItemAttributesLink: Selector('a').withText('Edit item attributes'),
      addAttributeButton: Selector('a').withText('Add Attribute'),
      attrNameInput: Selector('#name'),
      attrEnInput: Selector('#lang_en'),
      attrDeInput: Selector('#lang_de'),
      addValueButton: Selector('button[data-tc="add_value_button"]'),
      saveButton: Selector('button').withText('Save'),
    }
  }
}

export default new AdminPanel()
