import { t, ClientFunction, Selector } from 'testcafe';
import adminPage from './adminp'
import LogInForm from './login'
import newItemForm from './newitem'
import ProfileEditForm from './profileEdit'
import TopMenuBtns from './topmenu'
import {
  getURL,
  myUrl,
  groupsPage,
  projectCreateForm,
  projectManagePage,
  registrationForm,
} from './fixtures'


const topMenu = new TopMenuBtns()
const loginForm = new LogInForm()
const profileEditForm = new ProfileEditForm()
const translationMissing = Selector('body').withText('translation missing')

async function checkTranslation(selector) {
  if (await selector.exists) {
    await t.expect(selector.exists).notOk()
  }
};

export async function register(user) {
  checkTranslation(translationMissing)
  await t
    .typeText(registrationForm.inputs.firstName, user.firstName)
    .typeText(registrationForm.inputs.lastName, user.lastName)
    .typeText(registrationForm.inputs.email, user.email)
    .typeText(registrationForm.inputs.password, user.password)
    .click(registrationForm.labels.termsOfService)
  await t.click(registrationForm.buttons.signUp)
};

export async function logIn(user) {
  await t
    .typeText(loginForm.inputs.email, user.email)
    .typeText(loginForm.inputs.password, user.password)
    .click(loginForm.buttons.logIn)
};

export async function registerWithProfile(user) {
  checkTranslation(translationMissing)
  await t
    .typeText(registrationForm.inputs.firstName, user.firstName)
    .typeText(registrationForm.inputs.lastName, user.lastName)
    .typeText(registrationForm.inputs.email, user.email)
    .typeText(registrationForm.inputs.password, user.password)
    .click(registrationForm.inputs.termsOfService)
  await t.click(registrationForm.buttons.signUp)
  const getLocation = await getURL()

  await t.expect(getLocation).contains(myUrl + '/dashboard/profile/edit')

    .typeText(profileEditForm.inputs.name, user.name)
    .click(profileEditForm.buttons.save)
};

export async function createItem(itemName, itemDescription, itemPrice) {
  await t
    .click(topMenu.buttons.addDropdown)
    .click(topMenu.buttons.listItem)
    .typeText(newItemForm.inputs.name, itemName)

  await checkTranslation(translationMissing)

  await t
    .typeText(newItemForm.inputs.description, itemDescription)
    .typeText(newItemForm.inputs.price, itemPrice, { replace: true })
    .click(newItemForm.buttons.browseImages)
    .wait(1000)
    .setFilesToUpload(Selector('main').find('[name="files[]"]'), ['_uploads_/testimage.png',])
    .wait(1000)
    .typeText(newItemForm.inputs.quantity, "2", { replace: true })
    .wait(1000)

  await t
    .expect(newItemForm.buttons.submit.exists).ok(`expects ${newItemForm.buttons.submit} exists on this page`)
    .hover(newItemForm.buttons.submit)
    .click(newItemForm.buttons.submit)

  await t

    .expect(Selector('span').withText('(INVALID)').exists).ok()
    .click(newItemForm.buttons.secondLanguage)
    .typeText(newItemForm.inputs.nameDE, "Beispielartikel")

  await checkTranslation(translationMissing)

  await t
    .typeText(newItemForm.inputs.descriptionDE, "Dies ist eine kurze Beschreibung dieses Artikels")
    .click(newItemForm.buttons.submit)
};

export async function addAttributeValue(idx, lang1, lang2, value, valueLang1, valueLang2) {
  const inputValue = Selector(`input#value_${idx}`)
  const inputLang1 = Selector(`input#lang_${lang1}_${idx}`)
  const inputLang2 = Selector(`input#lang_${lang2}_${idx}`)

  await t
    .click(adminPage.stock.addValueButton)
    .typeText(inputValue, value)
    .typeText(inputLang1, valueLang1)
    .typeText(inputLang2, valueLang2)
}

export const prepareForPressKey = (str) => {
  let newStr = '';
  for (var i = 0; i < str.length; i++) {
    newStr = newStr + ' ' + str[i];
  }
  return newStr;
}

export async function createGroup(group) {
  await t.click(topMenu.buttons.addDropdown)
  await t.click(topMenu.addDropdown.createGroup)
  await checkErrors()
  await t
    .typeText(groupsPage.inputs.name, group.name, { paste: true })
  if (group.type == "public") {
    await t
      .click(Selector('label').withText('Public'))
  }
  if (group.type == "private") {
    await t
      .click(Selector('label').withText('Private'))
  }
  if (group.type == "secret") {
    await t
      .click(Selector('label').withText('Secret'))
  }
  await t

    .typeText(groupsPage.inputs.summary, group.summary, { paste: true })
    .click(Selector('label[for="description"]'))

  await t
    .pressKey(prepareForPressKey(group.description))
    .click(groupsPage.inputs.contentTypePost)
    .click(groupsPage.buttons.create)
};

//these are variables for challenges CodeMirror textareas


export async function createChallenge(challenge) {
  await t
    .click(projectManagePage.buttons.createNewChallenge)
    .typeText(projectCreateForm.inputs.name, challenge.name)
    .setFilesToUpload(Selector('main').find('[name="files[]"]'), ['_uploads_/testimage.png',])
    .typeText(projectCreateForm.inputs.summary, challenge.summary)
    .typeText(projectCreateForm.inputs.award, challenge.award)
  //tags need to be added here

  const setDescriptionValue = ClientFunction(() => {
    document.querySelectorAll('.CodeMirror')[0].CodeMirror.setValue('This is simple example project desc');
  });
  const setTermsValue = ClientFunction(() => {
    document.querySelectorAll('.CodeMirror')[1].CodeMirror.setValue('terms');
  });
  const setApplicationDescriptionValue = ClientFunction(() => {
    document.querySelectorAll('.CodeMirror')[2].CodeMirror.setValue('app desc');
  });

  await
    setDescriptionValue();
  await
    setTermsValue();
  await
    setApplicationDescriptionValue();

  //upload image
  await t
    .setFilesToUpload(Selector('main').find('[name="files[]"]'), ['_uploads_/testimage.png',])


    // timeline
    .typeText(projectCreateForm.inputs.developmentPartners, challenge.developmentPartners)
    .typeText(projectCreateForm.inputs.sentBy, challenge.sentBy)
    .click(projectCreateForm.buttons.create)
};

export async function updateChallenge(challengeUpdated) {
  await t
    .typeText(projectCreateForm.inputs.name, challengeUpdated.name,
      { replace: true })
    .typeText(projectCreateForm.inputs.summary, challengeUpdated.summary,
      { replace: true })
    .click(projectCreateForm.buttons.update)
};

export async function deletePromoCode(promoCodeID) {
  await t
   .setNativeDialogHandler(() => true)
   .click(Selector('button[data-tc="promo-code-delete-' + promoCodeID + '"]'))
};

export async function getPriceFromString(text, currency) {
  let promise = await text
  return promise.replace(currency, '').replace(/,/g, '')
}

export async function waitForSelector(selector, messageOnFail) {
  for (var i = 0; i < 60; i++) {
    if (!await selector.exists) {
      await t.eval(() => location.reload(true));
      await t.wait(1000)
    }
  }
  await t
    .expect(selector.exists).ok(messageOnFail)
};

export async function checkErrors() {
  const $ = {
    noTranslationMissing: Selector('body').withText('translation missing'),
    noLiquidError: Selector('body').withText('Liquid Error'),
    noFormError: Selector('body').withText('RenderFormTag Error:'),
    noQueryError: Selector('body').withText('QueryGraphTag Error:'),
    noExecuteQueryError: Selector('body').withText('ExecuteQueryTagError:'),
    imageNotFound: Selector('body').find('img[alt="Page missing"]')
  }

  await t.expect($.noTranslationMissing.exists).notOk();
  await t.expect($.noLiquidError.exists).notOk();
  await t.expect($.noFormError.exists).notOk();
  await t.expect($.noQueryError.exists).notOk();
  await t.expect($.noExecuteQueryError.exists).notOk();
  await t.expect($.imageNotFound.exists).notOk();
};
