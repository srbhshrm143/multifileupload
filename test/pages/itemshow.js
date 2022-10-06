import { Selector } from 'testcafe';

class ItemShowPage {
  constructor(item) {
    this.buttons = {
      addToCart: Selector('button').withText('Add to cart'),
      alreadyFollowedState: Selector('.following'),
      delete: Selector('button').withAttribute('title', 'Delete'),
      edit: Selector('main').find('a').withText('Edit'),
      follow: Selector('button').withAttribute('data-follow-user'),
      view_on_site: Selector('button').withText(/View on .+\'s site/),
      contactSeller: Selector('a').withText('Contact seller')
    }
    this.fields = {
      description: Selector('.card > p'),
      descriptionDE: Selector('div p').withText("Dies ist eine kurze Beschreibung dieses Artikels"),
      displayImage: ('img[src="_uploads_/testimage.png"]'),
      display_price: Selector('strong[data="item-price"]'),
      itemInfo: Selector('.sidenote > span'),
      itemPicture: Selector('picture > img'),
      itemPriceVariant1: Selector('strong[data="item-price"]').nth(0),
      itemPriceVariant2: Selector('strong[data="item-price"]').nth(1),
      name: Selector('.card > h1'),
      nameDE: Selector('h1').withText("Beispielartikel"),
      price: Selector('form .subtitle')
    }
    this.forms = {
      view_on_site: Selector('form').withAttribute('action', '/affiliate_items/redirect')
    }
    this.soldOutBadge = Selector('div').withText('SOLD OUT')
    this.status = {
      ordered: Selector('div').withText('Ordered')
    }
    this.variantSelector = Selector('select').withAttribute('id', /attr\-/)
  }
}

export default new ItemShowPage()
