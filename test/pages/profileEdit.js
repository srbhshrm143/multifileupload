import { Selector } from 'testcafe';

export default class ProfileView {
  constructor() {
    this.buttons = {
      save: Selector('button').withText('Save')
    }
    this.inputs = {
      username: Selector('#name'),
      email: Selector('#email'),
      firstName: Selector('#first-name'),
      lastName: Selector('#last-name'),
      bio: Selector('#bio')
    }
    this.title = Selector('.bigtitle')
  }
}

