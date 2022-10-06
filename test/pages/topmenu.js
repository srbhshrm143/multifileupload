import { Selector } from 'testcafe';

export default class TopMenuBtns {
  constructor() {
    this.languageSwitch = Selector('a[data-tc="language-switch"]')
    this.searchBox = Selector('form[name="search"]')
    this.itemList = Selector('div.grid')
    this.buttons = {
      addDropdown: Selector('header').find('button').withAttribute('title', 'Add content'),
      adminPanel: Selector('header').find('a').withText('Admin'),
      cart: Selector('a[title="Cart"]'),
      changeLanguageToDE: Selector('li a').withText('DE'),
      changeLanguageToEN: Selector('li a').withText('EN'),
      chat: Selector('#notifications-chat'),
      dashboard: Selector('a').withText('Dashboard'),
      feed: Selector('a').withText('Feed'),
      groups: Selector('a').withText('Groups'),
      items: Selector('header').find('a').withText('Items'),
      listItem: Selector('a').withText('Create item'),
      logIn: Selector('header').find('a').withText('Log in'),
      logo: Selector('span').withText('MVP Marketplace'),
      logOut: Selector('header').find('button').withText('Log out'),
      profile: Selector('header').find('a').withText('Profile'),
      profileDropdown: Selector('header nav > ul > li[data-tc="profile-menu-dropdown"] button'),
      publicProfile: Selector('nav a').withText('Public Profile'),
      search: Selector('button[value="search"]'),
      selling: Selector('header').find('a').withText('Selling'),
    }
    this.addDropdown = {
      addPost: Selector('li a').withText('Add post'),
      addQuestion: Selector('li a').withText('Add question'),
      createGroup: Selector('li a').withText('Create group'),
      createItem: Selector('li a').withText('Create item'),
      addChallenge: Selector('li a').withText('Add challenge')
    }
    this.profileDropdown = {
      dashboard: Selector('a').withText('Dashboard'),
      myFeed: Selector('nav a').withText('My Feed'),
      selling: Selector('li a').withText('Selling'),
      purchases: Selector('li a').withText('Purchases'),
      reviews: Selector('li a').withText('Reviews'),
      logOut: Selector('li a').withText('Log out'),
      admin: Selector('li a').withText('Admin'),
      projects: Selector('a[href="/projects/manage"]')
    }
  }
}
