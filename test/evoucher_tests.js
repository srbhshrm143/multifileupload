import { Role, Selector } from 'testcafe'
import { sellerB1Role } from './pages/roles'
import {
  myUrl,
  eVoucher,
  eVoucherToEdit,
  eVoucherToDelete,
} from './pages/fixtures'
import inventoryPage from './pages/inventory'
import itemSearch from './pages/itemsearch'
import itemShow from './pages/itemshow'
import newItemForm from './pages/newitem'


fixture`eVouchers`
  .page(myUrl)
  .meta('concurrency', 'true')
  .beforeEach(async t => {
    await t
      .useRole(sellerB1Role)
      .navigateTo(myUrl + '/dashboard/sell/items')
  })
  .afterEach(async t => {
    await t.useRole(Role.anonymous())
  })

test('Create eVoucher', async (t) => {
  await t
    .click(inventoryPage.addItemButton)
    .typeText(newItemForm.inputs.name, eVoucher.nameEn)
    .typeText(newItemForm.inputs.description, eVoucher.descriptionEn)
    .click(newItemForm.otherLanguageTab)
    .typeText(newItemForm.inputs.nameOtherLang, eVoucher.nameOtherLang)
    .typeText(newItemForm.inputs.descriptionOtherLang, eVoucher.descriptionOtherLang)
    .typeText(newItemForm.inputs.price, eVoucher.price, { replace: true })

    .click(newItemForm.selectMenus.itemType)
    .click(newItemForm.selectMenus.itemTypeOption.withAttribute('value', 'digital'))

    .click(newItemForm.buttons.browseImages)
    .setFilesToUpload(newItemForm.inputs.imageUploadBox.find('[name="files[]"]'), ['_uploads_/testimage.png',])
    .typeText(newItemForm.inputs.quantity, "2", { replace: true })
    .typeText(newItemForm.inputs.sku, "521985188")
    .click(newItemForm.buttons.submit)

  await t
    .expect(itemShow.fields.name.innerText).eql(eVoucher.nameEn)
    .expect(itemShow.fields.description.innerText).eql(eVoucher.descriptionEn)
    .expect(itemShow.fields.itemInfo.innerText).contains(eVoucher.info)
})

test('Search for eVoucher and edit it', async (t) => {
  await t.navigateTo(myUrl + "/search")

  await t
    .typeText(itemSearch.quickSearch.keyword, eVoucherToEdit.nameEn)
    .click(itemSearch.buttons.quickSearch)
    .click(itemSearch.links.itemName.withText(eVoucherToEdit.nameEn))

  await t
    .expect(itemShow.fields.name.withText(eVoucherToEdit.nameEn).exists).ok()
    .expect(itemShow.fields.description.withText(eVoucherToEdit.descriptionEn).exists).ok()

  await t
    .click(itemShow.buttons.edit)
    .typeText(newItemForm.inputs.name, eVoucherToEdit.editedName, { replace: true })
    .typeText(newItemForm.inputs.description, eVoucherToEdit.editedDescription, { replace: true, })
    .typeText(newItemForm.inputs.price, eVoucherToEdit.editedPrice, { replace: true, })
    .click(newItemForm.buttons.submit)

  const editedName = await itemShow.fields.name.withText(eVoucherToEdit.editedName)
  await t
    .expect(editedName.exists).ok()
    .expect(itemShow.fields.description.withText(eVoucherToEdit.editedDescription).exists).ok()
    .expect(itemShow.fields.price.innerText).eql(eVoucherToEdit.editedPrice, 'check item\'s price')
})

test('Delete eVoucher', async (t) => {
  const name = eVoucherToDelete.nameEn
  const itemLink = await Selector('a').withText(name)()
  const itemUrl = itemLink.getAttribute('href')
  const itemId = itemUrl.substring(itemUrl.lastIndexOf('-') + 1) - 1
  const deleteButton = await Selector('button').withAttribute('title', 'Delete').withAttribute('data-tc', `${itemId}`)

  await t.setNativeDialogHandler(() => true).click(deleteButton)

  await t.expect(deleteButton.withText('Delete').exists).notOk()
})
