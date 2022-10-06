import { Selector, Role } from 'testcafe';
import LogInForm from './login'
import { logIn } from './helper'
import {
    Admin,
    buyer2,
    John,
    loginConfirmation,
    myUrl,
    newSuperAdmin,
    RandomPerson,
    sellerA1,
    sellerB1,
    sellerC1,
    SellerRandomUser,
    TestCafeAccount,
    userWithChangedPassword,
    userWithIncompleteProfile,
    JohnChanged } from './fixtures'

const loginForm = new LogInForm()

export const buyerRole = Role(myUrl + "/sessions/new", async (t) => {
  await
    logIn(John)
})

export const buyerRoleChanged = Role(myUrl + "/sessions/new", async (t) => {
  await
    logIn(JohnChanged)
})

export const sellerRole = Role(myUrl + "/sessions/new", async (t) => {
  await
    logIn(SellerRandomUser)


  await t.expect(
      Selector('main').withText(loginConfirmation).exists
  ).ok('message ' + loginConfirmation + " doesn't exists")
})

export const adminRole = Role(myUrl + "/sessions/new", async (t) => {
  await
    logIn(Admin)
})

export const sellerA1Role = Role(myUrl + "/sessions/new", async (t) => {
  await
    logIn(sellerA1)
})

export const sellerB1Role = Role(myUrl + "/sessions/new", async (t) => {
  await
    logIn(sellerB1)
})

export const sellerC1Role = Role(myUrl + "/sessions/new", async (t) => {
  await
    logIn(sellerC1)
})

export const randomPersonRole = Role(myUrl + "/sessions/new", async (t) => {
  await
    logIn(RandomPerson)
})

export const tcAccRole = Role(myUrl + "/sessions/new", async (t) => {
  await
    logIn(TestCafeAccount)
})

export const incompleteProfileRole = Role(myUrl + "/sessions/new", async (t) => {
  await
    logIn(userWithIncompleteProfile)
})

export const newSuperAdminRole = Role(myUrl + "/sessions/new", async (t) => {
  await
    logIn(newSuperAdmin)
}, { preserveUrl: true })

export const buyer2Role = Role(myUrl + "/sessions/new", async (t) => {
  await
    logIn(buyer2)
})

export const changedPassRole = Role(myUrl + "/sessions/new", async (t) => {
  await
    logIn(userWithChangedPassword)
}, { preserveUrl: true })
