import { Selector } from 'testcafe';

export default class DashboardPage {
  constructor() {
    this.nav = {
      activityFeed: Selector('main').find('a').withText('Activity Feed'),
      bankAccount: Selector('a').withText('Bank Account'),
      editProfile: Selector('a').withText('Edit'),
      inbox: Selector('a').withText('Inbox'),
      itemsForSell: Selector('main').find('a').withText('Items for sell'),
      itemsToBuy: Selector('a').withText('Items to buy'),
      listAnItem: Selector('a').withText('List an Item'),
      myGroups: Selector('a').withText('My Groups'),
      publicProfile: Selector('a').withText('Public Profile'),
      purchases: Selector('span').find('a').withText('Purchases'),
      questions: Selector('main').find('a').withText('Questions'),
      sold: Selector('a').withText('Sold'),
    }
  }
}
