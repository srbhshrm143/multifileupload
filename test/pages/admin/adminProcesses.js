import { Selector } from 'testcafe';

class AdminProcessesPage {
  constructor() {
    this.url = '/admin/processes/'
    this.buttons = {
      accept: Selector('button').withText('Accept')
    }
  }
}

export default new AdminProcessesPage()
