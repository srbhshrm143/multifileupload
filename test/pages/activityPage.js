import { Selector } from 'testcafe';

export default class ActivityFeed {
  constructor() {
    this.buttons = {
      send: Selector('button').withText('Post'),
    }
    this.initialMessage = Selector('p').withText('Welcome to our community!')
    this.inputs = {
      message: Selector('textarea'),
    }
    this.menu = {
      activity: Selector('a').withText('Activity'),
      groups: Selector('a').withText('Groups'),
      following: Selector('a').withText('Following'),
      followers: Selector('a').withText('Followers'),
      products: Selector('a').withText('Products'),
    }
    this.postSection = Selector('article').withAttribute('data-tc="private-feed"')
  }
}
