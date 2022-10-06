import { Selector } from 'testcafe';


class ReturnItemDetailsPage {
  constructor() {
    this.itemReturnStatusIndicator = Selector('span[data-tc="item-return-status"]')
    this.title = Selector('.bigtitle')
  }
}

export default new ReturnItemDetailsPage()
