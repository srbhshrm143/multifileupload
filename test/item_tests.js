import { ClientFunction, Role, Selector } from 'testcafe'
import { sellerA1Role, sellerB1Role, sellerC1Role } from './pages/roles'
import {
  item,
  itemFromAffiliated,
  itemImage,
  itemNewData,
  itemToBeDeleted,
  itemToBeEdited,
  itemWithVariants,
  myUrl,
  newItemDescr2Lang,
  newItemDescrEn, newItemName2Lang, newItemNameEn,
  newItemSKU,
  sellerA1,
  topMenu,
} from './pages/fixtures'
import inventoryPage from './pages/inventory'
import itemSearch from './pages/itemsearch'
import itemShowPage from './pages/itemshow'
import newItemForm from './pages/newitem'


fixture`Item tests`
  .page(myUrl)
  .meta('concurrency', 'true')
  .before(async ctx => {
    ctx.itemName = item.name
    ctx.itemDescription = item.description
    ctx.itemPrice = item.price
  })
  .beforeEach(async t => {
    await t
      .useRole(sellerA1Role)
      .navigateTo(myUrl + '/dashboard/sell/items')
  })
  .afterEach(async t => {
    await t.useRole(Role.anonymous())
  })


test
  .before(async t => {
    await t
      .useRole(sellerB1Role)
      .navigateTo(myUrl + '/dashboard/sell/items')
  })('Create an item', async (t) => {
  await t
    .click(inventoryPage.addItemButton)

    .typeText(newItemForm.inputs.name, newItemNameEn, { paste: true })
    .typeText(newItemForm.inputs.description, newItemDescrEn, { paste: true })

    .click(newItemForm.otherLanguageTab)
    .typeText(newItemForm.inputs.nameOtherLang, newItemName2Lang, { paste: true })
    .typeText(newItemForm.inputs.descriptionOtherLang, newItemDescr2Lang, { paste: true })

    .setFilesToUpload(
      newItemForm.inputs.imageUploadBox.find('input[name="files[]"]'),
      [itemImage.path,]
    )

    .typeText(newItemForm.inputs.sku, newItemSKU, { paste: true })

    .click(newItemForm.buttons.submit)

    // As a merchant, check if the item has been actually added
    .expect(itemShowPage.fields.name.innerText).eql(newItemNameEn)
    .expect(itemShowPage.fields.description.innerText).eql(newItemDescrEn)

    // And check the other language version as well
    .click(topMenu.languageSwitch)
    .expect(itemShowPage.fields.name.innerText).eql(newItemName2Lang)
    .expect(itemShowPage.fields.description.innerText).eql(newItemDescr2Lang)
    .click(topMenu.languageSwitch)

  const getWindowLocation = ClientFunction(() => window.location)
  const location = await getWindowLocation()
  const itemUrl = location.href
  const itemId = itemUrl.substring(itemUrl.lastIndexOf('/') + 1)
  t.fixtureCtx.itemId = itemId

  // Check if the item is accessible for a regular user, in both language versions
  await t
    // Logout sellerB1Role
    .useRole(Role.anonymous())
    // Login sellerC1Role
    .useRole(sellerC1Role)
    .navigateTo(myUrl + '/items/en/' + itemId)
    .expect(itemShowPage.fields.name.innerText).eql(newItemNameEn)
    .expect(itemShowPage.fields.description.innerText).eql(newItemDescrEn)
    .click(topMenu.languageSwitch)
    .expect(itemShowPage.fields.name.innerText).eql(newItemName2Lang)
    .expect(itemShowPage.fields.description.innerText).eql(newItemDescr2Lang)
    .click(topMenu.languageSwitch)
})

test('Edit an item and search for it', async (t) => {
  const itemOldName = itemToBeEdited.name
  const itemNewName = itemNewData.name
  const itemNewDescription = itemNewData.description
  const itemNewPrice = itemNewData.price

  await t
    .navigateTo(myUrl)
    .typeText(itemSearch.quickSearch.keyword, itemOldName)
    .click(itemSearch.buttons.quickSearch)
    .expect(Selector('a').withText(itemOldName).exists).ok()

  await t
    .click(Selector('a').withText(itemOldName))
    .click(itemShowPage.buttons.edit)

  await t
    .typeText(newItemForm.inputs.name, itemNewName, { replace: true })
    .typeText(newItemForm.inputs.description, itemNewDescription, { replace: true, })
    .typeText(newItemForm.inputs.price, itemNewPrice, { replace: true, })
    .click(newItemForm.buttons.submit)

  await t
    .expect(itemShowPage.fields.name.innerText).contains(itemNewName)
    .expect(itemShowPage.fields.description.innerText).contains(itemNewDescription)
    .expect(itemShowPage.fields.price.innerText).eql('$' + itemNewPrice)

  // Sort of a tearDown phase - re-set the item's name back to the old name
  await t
    .click(itemShowPage.buttons.edit)
    .typeText(newItemForm.inputs.name, itemOldName, { replace: true })
    .click(newItemForm.buttons.submit)
    .expect(itemShowPage.fields.name.innerText).contains(itemOldName)
})

test('Create variants of an item', async (t) => {
  const itemId = itemWithVariants.id
  const editButton = Selector(`a[title="Edit"][data-tc="${itemId}"]`)
  const variant1Price = '30'
  const variant1Qty = '5'
  const variant2Price = '60'
  const variant2Qty = '10'

  await t
    .click(editButton)
    .scroll('bottom')

  await t
    .expect(newItemForm.variantsCheckbox.exists).ok()
    .hover(newItemForm.variantsCheckbox)
    .click(newItemForm.variantsCheckbox)

  await t
    .click(newItemForm.buttons.addMoreAttributes)
    .click(newItemForm.selectMenus.attributeSelect)
    .click(newItemForm.selectMenus.attributeColor)
    .click(newItemForm.selectMenus.optionSelect)

  await t
    .hover(newItemForm.selectMenus.option1)
    .click(newItemForm.selectMenus.option1)
    .hover(newItemForm.selectMenus.option2)
    .click(newItemForm.selectMenus.option2)
    // Click somewhere to close the popup with options
    .click(Selector('h3').withText('Variants'))
    .scroll('bottom')

  const imgIcons = await newItemForm.buttons.photos
  const variantPrices = await newItemForm.inputs.variantPrice
  const variantQuantities = await newItemForm.inputs.variantQuantity

  await t
    .typeText(variantPrices.nth(0), variant1Price, { paste: true })
    .typeText(variantQuantities.nth(0), variant1Qty, { paste: true })
    .click(imgIcons.nth(0))
    .click(newItemForm.buttons.addMoreFiles)
    .setFilesToUpload(
      newItemForm.inputs.variantImage, ['_uploads_/black.jpg',]
    )
    .click(newItemForm.buttons.uploadFiles)
    .expect(newItemForm.buttons.uploadFiles.exists).notOk()
    .expect(Selector('img[alt="black.jpg"]').exists).ok()
    .hover(newItemForm.buttons.uploadDone)
    .click(newItemForm.buttons.uploadDone)

  await t
    .typeText(variantPrices.nth(1), variant2Price, { paste: true })
    .typeText(variantQuantities.nth(1), variant2Qty, { paste: true })
    .click(imgIcons.nth(1))
    .click(newItemForm.buttons.addMoreFiles)
    .setFilesToUpload(
      newItemForm.inputs.variantImage, ['_uploads_/blue.jpg',]
    )
    .click(newItemForm.buttons.uploadFiles)
    .expect(newItemForm.buttons.uploadFiles.exists).notOk()
    .expect(Selector('img[alt="blue.jpg"]').exists).ok()
    .hover(newItemForm.buttons.uploadDone)
    .click(newItemForm.buttons.uploadDone)

  await t
    .hover(newItemForm.buttons.submit)
    .click(newItemForm.buttons.submit)

  const variantSelector = Selector('#attr-color')
  await t
    .expect(variantSelector.exists).ok()
    .click(variantSelector)
    .expect(itemShowPage.variantSelector.find('option').count).eql(2)
    .click(variantSelector)

    .expect(itemShowPage.fields.itemPicture.withAttribute('src', /black\.jpg/).exists).ok()
    .expect(itemShowPage.fields.itemPriceVariant1.innerText).eql('$' + variant1Price)

    .click(variantSelector)
    .click(itemShowPage.variantSelector.child(2))
    .expect(itemShowPage.fields.itemPicture.withAttribute('src', /blue\.jpg/).exists).ok()
    .expect(itemShowPage.fields.itemPriceVariant2.innerText).eql('$' + variant2Price)
})

test('Delete an item from inventory', async (t) => {
  const itemId = itemToBeDeleted.id
  const deleteButton = Selector(`button[title="Delete"][data-tc="${itemId + 1}"]`)
  await t
    .setNativeDialogHandler(() => true)
    .click(deleteButton)
    .expect(deleteButton.exists).notOk()

  // Restore the deleted (unpublished, actually) item
  const publishButton = Selector(`button[title="Publish"][data-tc="${itemId + 1}"]`)
  await t
    .setNativeDialogHandler(() => true)
    .click(publishButton)
    .expect(publishButton.exists).notOk()
})

test('Checkout out an item of affiliated merchant', async (t) => {
  const name = itemFromAffiliated.name
  await t
    .navigateTo(myUrl)
    .typeText(itemSearch.quickSearch.keyword, name)
    .click(itemSearch.buttons.quickSearch)
    .expect(Selector('a').withText(name).exists).ok()

    .click(Selector('div h2 a').withText(name))

  await t
    .expect(itemShowPage.buttons.view_on_site.withText(`View on Organization A's site`).exists).ok()

  await t
    .expect(itemShowPage.forms.view_on_site.exists).ok()
})

test.skip('Change quantity of item variant and check it\'s status', async (t) => {
  await t
    .click(Selector(inventoryPage.item.withText(
        sellerA1.itemForQuantityTest)
    ).find('a').withAttribute('title', 'Edit'))

  await t
    .typeText(newItemForm.inputs.variantQuantity, '0', { replace: true })

  await t
    .expect(newItemForm.buttons.submit.exists).ok('Expects "save" button exists on this page')
    .hover(newItemForm.buttons.submit)
    .click(newItemForm.buttons.submit)

  await t
    .expect(itemShowPage.soldOutBadge.exists).ok('Expects "sold out" badge to appear on this item page')
    .expect(itemShowPage.fields.itemPicture.withAttribute('src', /cat1\.jpg/).exists).ok()
    .expect(itemShowPage.buttons.addToCart.withAttribute('disabled').exists).ok()

  await t
    .click(itemShowPage.buttons.edit)

  await t
    .typeText(newItemForm.inputs.variantQuantity, '1', { replace: true })

  await t
    .expect(newItemForm.buttons.submit.exists).ok('Expects "save" button exists on this page')
    .hover(newItemForm.buttons.submit)
    .click(newItemForm.buttons.submit)

  await t
    .expect(itemShowPage.soldOutBadge.exists).notOk('Expects "sold out" badge not to appear on this item page')
    .expect(itemShowPage.fields.itemPicture.withAttribute('src', /cat1\.jpg/).exists).ok()
    .expect(itemShowPage.buttons.addToCart.exists).ok('Expects "add to cart" button to appear on this item page')
})
