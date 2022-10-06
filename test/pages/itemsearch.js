import { Selector } from 'testcafe';

class ItemSearch {
  constructor() {
    this.buttons = {
      quickSearch: Selector('button').withText('Search'),
      search: Selector('button').withText('Search').nth(1),
      sellers: Selector('.form-select').withText('All sellers'),
      sort: Selector('select[name="sort_by"]'),
    }
    this.categoryFilter = {
      option: Selector('#category > option'),
      selectForm: Selector('#category'),
    }
    this.links = {
      itemName: Selector('h2 a'),
      seeMore: Selector('a').withText('See more'),
    }
    this.options = {
      theMostRecent: Selector('option').withText('The Most Recent')
    }
    this.priceFilter = {
      priceMax: Selector('#price_max'),
      priceMin: Selector('#price_min'),
    }
    this.quickSearch = {
      keyword: Selector('input[name="qkeyword"]')
    }
    this.results = {
      seededAvailableItem: Selector('div h2 a').withText('Aries Gold'),
    }
    this.search = {
      keyword: Selector('input[name="keyword"]'),
    }
    this.sellerFilter = {
      checkbox: Selector('input[type="checkbox"]'),
      searchBox: Selector('input[type="text"]'),
    }
  }
}

export default new ItemSearch()
