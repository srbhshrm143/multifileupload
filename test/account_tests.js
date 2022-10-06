import { Selector } from 'testcafe'
import {
  activityFeed,
  Admin,
  getURL,
  John,
  loginForm,
  myUrl,
  passwordResetForm,
  profileEditForm,
  topMenu,
  userWithChangedPassword,
} from './pages/fixtures'
import { buyer2Role, } from './pages/roles'
import signUpPage from './pages/registration.js'


fixture`Account/profile tests`
  .page(myUrl)
  .meta('concurrency', 'true')


test(`Register a user and edit their profile`, async (t) => {
  await t.navigateTo('/sign-up')

  await signUpPage.register(John)

  await t
    .navigateTo(myUrl + '/dashboard/profile/edit')
    .expect(profileEditForm.title.innerText).eql('Profile Edit')
    .expect(profileEditForm.inputs.username.value).eql('')

  await t
    .typeText(profileEditForm.inputs.username, John.name, { replace: true })
    .click(profileEditForm.buttons.save)

  await t.navigateTo('/dashboard/profile/edit')
  await t.expect(profileEditForm.inputs.username.value).eql(John.name)
})

test(`User checks the feed`, async (t) => {
  await t
    .useRole(buyer2Role)
    .navigateTo(myUrl + "/my/feed")
    .expect(activityFeed.initialMessage.exists).ok()
    .expect(activityFeed.postSection.exists).notOk()
})

test(`User resets password`, async (t) => {
  await t
    .click(topMenu.buttons.logIn)
    .click(loginForm.buttons.resetPassword)
  await t.typeText(passwordResetForm.inputs.email, userWithChangedPassword.email, { paste: true })
  await t.click(passwordResetForm.buttons.resetPasswordSubmit)
  const passwordResetUrl = await Selector('main').innerText
  await t
    .navigateTo(passwordResetUrl)
    .typeText(passwordResetForm.inputs.newPassword, userWithChangedPassword.changedPassword, { paste: true })
    .typeText(passwordResetForm.inputs.newPasswordConfirmation, userWithChangedPassword.changedPassword,
        { paste: true })
    .click(passwordResetForm.buttons.submit)
    .navigateTo(myUrl + '/sessions/new')
    .typeText(loginForm.inputs.email, userWithChangedPassword.email)
    .typeText(loginForm.inputs.password, userWithChangedPassword.changedPassword)
    .click(loginForm.buttons.logIn)
  await t.expect(getURL()).notContains('/sessions/new')
  await t
    .navigateTo(myUrl + '/dashboard/profile/edit')
    .expect(profileEditForm.inputs.email.value).eql(userWithChangedPassword.email)
})

test(`Attempt to register a user that already exists in the system`, async (t) => {
  await t.navigateTo(myUrl + '/sign-up')

  await signUpPage.register(Admin)

  await t
    .expect(signUpPage.invalidInputs.email.visible).ok()
    .expect(signUpPage.invalidInputs.email.textContent).contains('already taken')
  },
)
