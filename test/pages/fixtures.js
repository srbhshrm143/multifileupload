import { ClientFunction, Selector } from 'testcafe'
import faker from 'faker'


//import pages
import ActivityFeed from './activityPage'
import Cart from './cart'
import Challenge from './challenge'
import ContactUs from './contactUsForm'
import DashboardPage from './dashboard'
import Footer from './footer'
import GroupsPage from './groupsPage'
import LogInForm from './login'
import MerchantReviewCreateForm from './merchantReviewCreateForm'
import MerchantReviewPage from './merchantReviewPage'
import OrderSellerReviewPage from './orderSellerReviewPage'
import OrdersPage from './orders'
import PasswordReset from './passwordReset'
import ProfileEditForm from './profileEdit'
import ProfileView from './publicProfile'
import ProductReviewCreateForm from './productReviewCreateForm'
import ProductReviewDetailsPage from './productReviewDetailsPage'
import ProductReviewPage from './productReviewPage'
import ProjectCreateForm from './challengeCreateForm'
import ProjectDetailsPage from './challengeDetailsPage'
import ProjectManagePage from './challengeManagePage'
import ProjectPublicPage from './challengePublicPage'
import SoldOrders from './soldOrders'
import StaticPages from './static-pages'
import TopicsPage from './topicsPage'
import TopMenuBtns from './topmenu'


//variables
export const categoryName = "Clothes"
export const commentText = "What's new bro?"
export const editURL = '/dashboard/items/edit?id='
export const getURL = ClientFunction(() => window.location.href)
export const groupName = faker.lorem.words();
export const link = Selector('a')
export const loginConfirmation = 'Logged in'
export const loremSentence = "Lorem ipsum dolor sit vivamus estspace."
export const myUrl = process.env.MPKIT_URL.replace(/\/$/, '', '')
export const notAuthorizedUser = "The system has determined that you are not presently authorized to use this system function."
export const permissionDenied = 'You are not authorized to do this action!'
export const randomFirstName = faker.name.firstName()
export const randomLastName = faker.name.lastName()
export const resetConfirmation = 'Please check your email.';
export const translationMissing = (Selector('body').withText("translation missing"))


//export pages
export const activityFeed = new ActivityFeed()
export const cartPage = new Cart()
export const challengePage = new Challenge()
export const contactUsForm = new ContactUs()
export const dashboard = new DashboardPage()
export const footer = new Footer()
export const groupsPage = new GroupsPage()
export const loginForm = new LogInForm()
export const merchantReviewCreateForm = new MerchantReviewCreateForm()
export const merchantReviewPage = new MerchantReviewPage()
export const orders = new OrdersPage()
export const orderSellerReviewPage = new OrderSellerReviewPage()
export const passwordResetForm = new PasswordReset()
export const publicProfile = new ProfileView()
export const productReviewDetailsPage = new ProductReviewDetailsPage()
export const productReviewCreateForm = new ProductReviewCreateForm()
export const productReviewPage = new ProductReviewPage()
export const profileEditForm = new ProfileEditForm()
export const projectCreateForm = new ProjectCreateForm()
export const projectDetailsPage = new ProjectDetailsPage()
export const projectManagePage = new ProjectManagePage()
export const projectPublicPage = new ProjectPublicPage()
export const soldOrders = new SoldOrders()
export const staticPages = new StaticPages()
export const topicsPage = new TopicsPage()
export const topMenu = new TopMenuBtns()

//export few accounts

//buyer
export const John = {
  email: 'johnsmith@example.com',
  password: 'password',
  name: 'johnsmith',
  firstName: 'John',
  lastName: 'Smith',
  phone: faker.phone.phoneNumber()
}

export const JohnChanged = {
  email: 'johnsmith@example.com',
  password: 'adminPassword',
  name: 'johnsmith',
  firstName: 'John',
  lastName: 'Smith',
  phone: faker.phone.phoneNumber()
}

//admin
export const Admin = {
  email: 'admin@example.com',
  firstName: 'Admin',
  lastName: 'Anton',
  password: 'password',
  newPassword: 'newpassword',
}

//account for reset password test needs
export const TestCafeAccount = {
  email: 'testcafe@tc.com',
  password: 'password',
  name: randomFirstName.toLowerCase(),
  firstName: randomFirstName,
  lastName: randomLastName,
  newPassword: 'newPassword'
}

//random seller user
export const SellerRandomUser = {
  email: faker.internet.email().toLowerCase(),
  password: '12345',
  name: randomFirstName.toLowerCase(),
  firstName: randomFirstName,
  lastName: 'Porter'
}

//random seeded account
export const RandomPerson = {
  name: 'random-person',
  fullName: 'Random Ann',
  email: 'random@example.com',
  password: 'password',
  firstName: 'Ann',
  lastName: 'Random'
}

//seeded other merchant account
export const sellerA1 = {
  name: 'employee-a-1',
  email: 'employee-a-1@example.com',
  password: 'password',
  item: 'Cobra Paris CO6394A1',
  itemUrl: '/items/cobra-paris-co6394a1-analog-watch-for-men-boys-20',
  itemForQuantityTest: 'Fluid DMF-002-GR01 Digital Watch',
  organizationName: 'Organization A',
  organizationSlug: 'organization-a',
  message: (faker.lorem.sentence() + faker.lorem.sentence() + faker.lorem.sentence())
}

//seeded merchant account
export const sellerB1 = {
  name: 'employee-b-1',
  email: 'employee-b-1@example.com',
  password: 'password',
  item: 'Vencer Stella 7lyt1011',
  reviewItem: 'Rorlig RR-028 Expedition Analog Watch - For Men, Boys',
  reviewMerchantId: '7628',
  reviewItemId: '7626',
  organizationSlug: 'organization-b',
}

//seeded merchant account
export const sellerC1 = {
  name: 'employee-c-1',
  email: 'employee-c-1@example.com',
  password: 'password',
  reviewMerchantId: '7628',
  reviewItemId: '7626',
  organizationSlug: 'organization-c'
}

//this account is in use in tests for buying products by anon
export const Anon = {
  email: 'anon@example.com',
  password: 'password',
  name: randomFirstName.toLowerCase(),
  firstName: randomFirstName,
  lastName: 'Anon',
  phone: faker.phone.phoneNumber()
}

// user with incomplete profile (lacking username and slug)
// created during data seeding
export const userWithIncompleteProfile = {
  email: 'incomplete-profile@example.com',
  password: 'password',
  firstName: 'Mary',
  lastName: 'Smith'
}

export const buyer2 = {
  email: 'buyer@example.com',
  firstName: 'Buyer',
  lastName: 'Frank',
  password: 'password',
  phone: faker.phone.phoneNumber(),
  message: (faker.lorem.sentence() + faker.lorem.sentence() + faker.lorem.sentence())
}

export const newSuperAdmin = {
  email: 'new-superadmin@example.com',
  password: 'password',
  firstName: 'Julie',
  id: '11',
  lastName: 'Maddox'
}

export const userWithChangedPassword = {
  email: 'change-password@example.com',
  password: 'password',
  changedPassword: "newpassword",
  firstName: 'Ben',
  lastName: 'Stanton'
}

//this is for create item test
export const item = {
  name: faker.commerce.productName(),
  type: faker.commerce.productMaterial(),
  description: faker.lorem.word(),
  price: '10000',
  commonName: "johnsmith watch"
}

export const item1 = {
  category: 'Watches',
  name: 'Camerii WM64 Elegance Analog Watch - For Men, Boys',
  organizationSlug: 'organization-b',
  price: '10.99',
  type: 'Watches',
}

export const item2 = {
  name: 'Rochees RW38 Analog Watch - For Boys',
  path: '/items/en/rochees-rw38-analog-watch-for-boys-44',
}

export const item3 = {
  name: 'Rorlig RR-028 Expedition Analog Watch - For Men, Boys',
  path: '/items/en/rorlig-rr-028-expedition-analog-watch-for-men-boys-48',
}

export const item4 = {
  category: 'Table Clocks',
  name: 'T STAR UFT-TSW-005-BK-BR Analog Watch - For Boys',
  organizationSlug: 'organization-c',
  path: '/items/en/t-star-uft-tsw-005-bk-br-analog-watch-for-boys-52',
}

export const item5 = {
  name: 'Sleek Paper Coat',
}
export const itemNewData = {
  name: 'Super Dandy Item',
  type: faker.commerce.productMaterial(),
  description: faker.lorem.word(),
  price: '25.99',
}

export const itemToBeEdited = {
  name: 'Swag 670038 Analog Watch',
}

export const itemToBeDeleted = {
  name: 'Estilo 1056 Analog Watch - For Boys, Men',
  id: 152
}

export const itemWithVariants = {
  name: 'Kool Kidz DMK-012-QU02 Analog Watch - For Girls, Boys',
  id: 105,
}

//export const itemShow = new ItemShowPage(item)
//export const editedItemShow = new ItemShowPage(itemToBeEdited)
//export const itemSearch = new ItemSearch(item, itemToBeEdited)

export const itemFromAffiliated = {
    name: "Booking.com discount",
};

//this is list of not allowed places for users whose don't fullfilled profile
export var notAllowedPlaces = [
  dashboard.nav.inbox,
  dashboard.nav.myGroups,
  topMenu.buttons.chat,
  dashboard.nav.activityFeed,
  dashboard.nav.publicProfile
];


// this is a list of pages that should be inaccessible for a user with incomplete profile
export var inaccessiblePages = [
  '/dashboard',
  '/dashboard/groups',
  '/dashboard/items/new',
  '/dashboard/payments/account',
  '/dashboard/posts',
  '/dashboard/profile/edit',
  '/dashboard/sell/data',
  '/dashboard/sell/items',
  '/dashboard/sell/line_item_returns',
  '/dashboard/sell/orders',
  '/dashboard/sell/organizations/edit',
  '/dashboard/sell/promo_codes',
  '/dashboard/sell/sales',
  '/groups/new',
  '/inbox',
  '/my/feed',
  '/notifications',
  '/offers/manage',
  '/posts/new',
  '/profile',
  //'/projects/new',
  '/wishlist'
];


//users without fullfilled profile may not enter below sections
export var notAllowedPlacesDropDown = [
  topMenu.addDropdown.addPost,
  topMenu.addDropdown.addQuestion,
  topMenu.addDropdown.createGroup
];

//for group tests
export const group = {
  name: "publicGroup",
  commonName: "public group",
  audifans: "audi fans",
  summary: "fun-club",
  type: "public",
  description: loremSentence
}

export const groupPrivate = {
  name: "privateGroup",
  commonName: "private group",
  audifans: "audi fans",
  summary: "fun-club",
  type: "private",
  description: loremSentence
}

export const groupSecret = {
  name: "secretGroup",
  commonName: "secret group",
  audifans: "audi fans",
  summary: "fun-club",
  type: "secret",
  description: loremSentence
}

export const productReview = {
  description: "This is a 'test' of \"productReview\"! (2 + 2) * 4 = ?",
  benefits:  "This is a 'test' of \"benefits\"! (2 + 2) * 4 = ?",
  disadvantages: "This is a 'test' of \"disadvantages\"! (2 + 2) * 4 = ?"
}

export const productReviewSeeded = {
  product: "Felix Y 39 Analog Watch - For Boys, Men",
  description: "This is a 'test' of seeded \"productReview\"! (2 + 2) * 4 = ?",
  benefits:  "This is a 'test' of seeded \"benefits\"! (2 + 2) * 4 = ?",
  disadvantages: "This is a 'test' of seeded \"disadvantages\"! (2 + 2) * 4 = ?",
  rateAmount: 3,
  emptyStars: 2,
  id: "7678"
}

export const merchantReview = {
  description: "This is a 'test' of \"merchantReview\"! (2 + 2) * 4 = ?"
}

export const merchantReviewSeeded = {
  description: "This is a 'test' of seeded \"merchantReview\"! (2 + 2) * 4 = ?",
  id: "7680"
}

export const newItemNameEn = 'New "Super" item Special Offer! $atisfaction 100% guaranteed'
export const newItemName2Lang = 'Neues "Super" Artikel Sonderangebot! Zufriedenheit 100% garantiert'
export const newItemDescrEn = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sem orci, ultrices et nibh sit amet, laoreet tristique purus. Nam eget turpis felis. Cras.'
export const newItemDescr2Lang = 'Als Regenwald bezeichnet man Wälder, die durch ganzjährig fallende, große Niederschlagsmengen gekennzeichnet sind. Wegen der völlig unterschiedlichen'
export const newItemSKU = "123"

export const variantAttributeValues = [
  { value: 'short', valueLang1: 'short', valueLang2: 'kurz' },
  { value: 'regular', valueLang1: 'regular', valueLang2: 'regulär' },
  { value: 'long', valueLang1: 'long', valueLang2: 'lang' },
]

export const categoryToCreate = {
  english: 'fruits',
  secondLanguage: 'früchte'
}

export const categoryToEdit = {
  english: 'necklaces',
  secondLanguage: 'necklacesDE'
}

export const challenge = {
  name: "Test 'Challenge!' (12&23)",
  summary: "This is a short description of a challenge! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet est maximus, laoreet velit.",
  award: "10000",
  developmentPartners: "platformOS",
  sentBy: "platformOS"
}

export const challengeUpdated = {
  name: "Test 'Updated Challenge!!!'",
  summary: "This description has been changed! Nam bibendum massa ut sapien elementum, ut viverra turpis gravida. Praesent cursus diam ullamcorper, vestibulum.",
}

export const challengeCommented = {
  comment: "This is a 'test' \"comment\"! (2 + 2) * 4 = ?"
}

export const globalPromoCode = {
  availablePromoCodes: "1",
  campaignCode: "global",
  code: "ANTONADMIN30GLOBAL",
  descriptionEn: "This is a 'test' of global EN \"promoCode\"! (2 + 2) * 4 = ?",
  descriptionOtherLang: "This is a 'test' of global DE \"promoCode\"! (2 + 2) * 4 = ?",
  discountCap: "600",
  endDate: "2023-12-24",
  marketPlaceOwnerFee: "100",
  maxAvailableCodes: "1",
  maxDiscountPerUser: "100",
  maxTimesUserCanUse: "1",
  merchantName: "ANTONADMIN",
  selectedMerchantForGlobalPromoCode: "Organization C",
  startDate: "2021-12-22",
  totalDiscount: "30",
  value: "GLOBAL30",
  codeTypes: {
    merchant: 'Merchant',
    mpo: 'MPO',
    global: 'MPO Global'
  }
}

export const globalPromoCodeSeeded = {
  availablePromoCodes: "1",
  campaignCode: "seed",
  code: "ANTONADMIN77SEED",
  descriptionEn: "This is a 'test' of seeded global EN \"promoCode\"! (2 + 2) * 4 = ?\"",
  descriptionOtherLang: "This is a 'test' of seeded global DE \"promoCode\"! (2 + 2) * 4 = ?\"",
  discountCap: "1000",
  endDate: "2023-12-27",
  id: "7671",
  marketPlaceOwnerFee: "100",
  maxAvailableCodes: "1",
  owner: "Anton Admin",
  selectedMerchantForGlobalPromoCode: "Organization C",
  startDate: "2021-12-21",
  totalDiscount: "77",
  value: "77SEED",
}

export const promoCode = {
  availablePromoCodes: "1",
  campaignCode: "winter",
  descriptionEn: "This is a 'test' \"promoCode\"! (2 + 2) * 4 = ?",
  descriptionOtherLang: "This is a 'test' \"promoCode\"! (2 + 2) * 4 = ?",
  discountCap: "500",
  endDate: "2023-12-23",
  maxAvailableCodes: "1",
  maxDiscountPerUser: "100",
  maxTimesUserCanUse: "1",
  owner: "Organization B",
  startDate: "2021-12-23",
  totalDiscount: "50",
  value: "50WINTER"
}

export const promoCodeSeeded = {
  availablePromoCodes: "1",
  campaignCode: "spring",
  descriptionEn: "This is a seeded EN'test' \"promoCode\"! (2 + 2) * 4 = ?",
  descriptionDe: "This is a seeded DE'test' \"promoCode\"! (2 + 2) * 4 = ?",
  discountCap: "500",
  endDate: "2023-12-25",
  id: "7668",
  maxAvailableCodes: "1",
  owner: "Organization B",
  startDate: "2021-12-24",
  totalDiscount: "50",
  value: "ORGANIZATIONB50SPRING"
}

export const eVoucher = {
  descriptionEn: "This is a 'test' \"eVoucher\"! (2 + 2) * 4 = ?",
  descriptionOtherLang: "Dies ist ein 'Test' \"eGutschein\"! (2 + 2) * 4 = ?",
  info: 'This is an online voucher',
  maxAvailableCodes: "1",
  nameEn: "eVoucher",
  nameOtherLang: "eGutschein",
  price: "50",
  quantity: "1",
}

export const eVoucherToEdit = {
  descriptionEn: 'Edit me',
  descriptionOtherLang: 'Bearbeite mich',
  editedDescription: "This is a edited 'test' \"eVoucher\"! (2 + 2) * 4 = ?",
  editedName: "eVoucher edited",
  editedPrice: "$5,000",
  nameEn: 'eVoucher EDIT ME $1000!',
  nameOtherLang: 'eVoucher EDIT ME $1000!',
}

export const eVoucherToDelete = {
  descriptionEn: 'Delete me',
  descriptionOtherLang: 'Lösch mich',
  nameEn: 'eVoucher DELETE ME $1000!',
  nameOtherLang: 'eVoucher DELETE ME $1000!',
}

export const itemImage = {
  path: '_uploads_/testimage.png'
}

export const organizationToInviteTo = "Organization A"
