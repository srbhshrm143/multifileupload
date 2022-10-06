import { Selector } from 'testcafe';

class InventoryPage {
  constructor() {
    this.addItemButton = Selector('a').withText('Add Item')
    this.buttons = {
      deleteItem: Selector('button[title="Delete"]'),
      editItem: Selector('a[title="Edit"]'),
      publishItem: Selector('a[title="Publish"]'),
    }
    this.header = Selector('.heading > .container > .bigtitle')
    this.item = Selector('ul[data-tc="inventory-product"]')
    this.itemList = Selector('div[data-list-filtered-frame] > .table > .table-content')
  }
}

export default new InventoryPage()
