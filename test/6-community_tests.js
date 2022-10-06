import { Selector, ClientFunction, t } from 'testcafe'
import { buyerRole, adminRole, merchantRoleB, randomPersonRole } from './pages/roles'
import {
  John,
  SellerRandomUser,
  myUrl,
  group,
  link,
  commentText,
  topMenu,
  dashboard,
  groupsPage,
  activityFeed,
  topicsPage,
  itemSearch,
  SellerMerchantB,
  RandomPerson,
  groupPrivate,
  groupSecret,
  getURL
} from './pages/fixtures'
import { checkErrors, createGroup, waitForSelector, prepareForPressKey } from './pages/helper'

fixture`Groups`.page(myUrl)

test('Create public group. Group names cannot be duplicated', async (t) => {
  await t
    .useRole(adminRole)
    .navigateTo(myUrl + '/admin/groups/main') // temporary way of fixing main group

  await t.useRole(buyerRole)
  await createGroup(group)
  await createGroup(group)
  await t
    .expect(Selector('div').textContent)
    .contains('already taken')
    //checks if group exists
    //
  await t.navigateTo(myUrl + '/dashboard/posts')
    .click(dashboard.nav.myGroups)
    .expect(link.withText(group.name).exists).ok(`${group.name} exists`)
    .click(groupsPage.buttons.editGroup)
    .typeText(groupsPage.inputs.name, group.commonName, { replace: true })
    .click(groupsPage.buttons.update)
    .expect(Selector('h1').withText(group.commonName).exists).ok(`group title ${group.commonName} exists on page details`)

  await checkErrors()
})

test('Add feed to public group as owner', async (t) => {
  await t
    .useRole(buyerRole)

  await t.navigateTo(myUrl + '/dashboard/posts')
    .click(dashboard.nav.myGroups)
    .click(Selector('a').withText('public group'))
    .typeText(Selector('textarea[name="post[body]"]'), "group-feed")
    .click(Selector('button').withText('Post'))
  await t.navigateTo(myUrl + '/dashboard/posts')
    .click(dashboard.nav.myGroups)
    .click(Selector('a').withText('public group'))
    .expect(Selector('p').withText('group-feed').exists).ok("there should exist feed with text 'group-feed'")
})

test('Create private group', async (t) => {
  await t.useRole(buyerRole)
  await createGroup(groupSecret)

  await t.navigateTo(myUrl + '/dashboard/groups')
  await checkErrors()

  await t
    .expect(link.withText(groupSecret.name).exists).ok(`${groupSecret.name} exists`)
})

test('Create secret group, post content', async (t) => {
  await t.useRole(buyerRole)
  await createGroup(groupPrivate)


  await t.navigateTo(myUrl + '/dashboard/groups')
  await checkErrors()

  await t
    .expect(link.withText(groupPrivate.name).exists).ok(`${groupPrivate.name} exists`)

  await t
    .click(link.withText(groupPrivate.name))

  await t
    .click(Selector('a').withText('Content'))
    .click(Selector('a').withText('Add content'))
    .typeText(Selector('#title'), "content title", { paste : true })
    .click(Selector('label[for="body"]'))
  await t
    .pressKey(prepareForPressKey("content body"))
  await t
    .click(Selector('p').withText('Question'))
  await t
    .click(Selector('button').withText('Add'))

  await t
    .expect(Selector('h2').withText('content title').exists).ok()
    .expect(Selector('p').withText('contentbody').exists).ok()
})

test('Verify uninvited user cannot see private group content, user asks to join this group', async (t) => {
  await t
    .useRole(randomPersonRole)
    .navigateTo(myUrl + "/groups")
    checkErrors()
  await t
    .click(Selector('[data-tc="group-card"]').find('a').withText('privateGroup'))

    await t
    .expect(Selector('h2').withText('content title').exists).notOk()
    .expect(Selector('p').withText('contentbody').exists).notOk()

  await t
    .expect(Selector('a').withText('Content').exists).notOk()

  await t
    .navigateTo(myUrl + "/groups")

    .click(Selector('[data-tc="group-card"]').withText('privateGroup').find('button').withText('Ask to join'))
})

test('Uninvited user cannot see secret group', async (t) => {
  await t
    .useRole(randomPersonRole)
    .navigateTo(myUrl + "/groups")
    checkErrors()
  await t
    .expect(Selector('[data-tc="group-card"]').withText('secret group').exists).notOk("Uninvited user shouldn't see 'secret group' group")
})

test('User can join public group', async (t) => {
  await t
    .useRole(randomPersonRole)
    .navigateTo(myUrl + "/groups")
    .click(Selector('[data-tc="group-card"]').withText('public group').find('button').withText('Join'))
})

test('Group owner accepts "randomPerson" request for group joining', async (t) => {
  await t
    .useRole(buyerRole)
    .navigateTo(myUrl + "/my/groups")
    .click(Selector('[data-tc="group-card"]').find('a').withText('privateGroup'))

    let groupUrl = await getURL()
    let groupManageUrl = await groupUrl + "/relationships"

    await t
      .navigateTo(groupManageUrl)


  await t
    .click(Selector('button').withText('Accept request'))
})

test('Verify user can see private group content after group owner acceptation', async (t) => {
  await t
    .useRole(randomPersonRole)
    .navigateTo(myUrl + "/groups")
    checkErrors()
  await t
    .click(Selector('[data-tc="group-card"]').find('a').withText('privateGroup'))

  await t
    .click(Selector('li a').withText('Content'))

  await t
    .expect(Selector('[data-tc="group-content-post"]').withText('content title').exists).ok()

})

test.skip('Invite user to private group', async (t) => {
  await t
    .useRole(buyerRole)
    .navigateTo(myUrl + "/my/groups")
    .click(Selector('[data-tc="group-card"]').find('a').withText('privateGroup'))
    .click(Selector('button[title="Toggle dropdown"]'))
    .click(Selector('button[title="Toggle dropdown"]').find('li a').withText('Invite new member'))
})

test.skip('Invite user to secret group', async (t) => {
  await t
    .useRole(buyerRole)
    .navigateTo(myUrl + "/my/groups")
    .click(Selector('[data-tc="group-card"]').find('a').withText('secretGroup'))
    .click(Selector('button[title="Toggle dropdown"]'))
    .click(Selector('button[title="Toggle dropdown"]').find('li a').withText('Invite new member'))
})

fixture`Community aspects`.page(myUrl)

test('Follow person', async (t) => {
  // randomPerson user try to follow admin user
  await t
    .useRole(randomPersonRole)
    .navigateTo(myUrl + '/profile/anton-admin')
    .click(Selector('button[title="Follow or unfollow user"]'))
    .click(Selector('a').withText('Followers'))
    .expect(Selector('a').withText(RandomPerson.fullName).exists)
    .ok()
})

test.page(myUrl + '/search')('Follow button not exists for anons', async (t) => {
  await t.expect(Selector('button[title="Follow or unfollow user"]').exists).notOk()
})

test('Add question and edit', async (t) => {
  await t
    .useRole(adminRole)
    .navigateTo(myUrl + '/admin/groups/main') // temporary way of fixing main group
    .click(topMenu.buttons.addDropdown)
    .click(topMenu.addDropdown.addQuestion)
  await checkErrors()
  await t
    .typeText(topicsPage.inputs.questionTitle, 'How to buy?')
    .click(Selector('label[for="body"]'))
    .pressKey('q u e s t i o n')
    .typeText(topicsPage.inputs.questionTags, 'test-question-tag')
    .click(topicsPage.inputs.contentTypeQuestion)
    .click(topicsPage.buttons.postQuestion)
    //.expect(topicsPage.buttons.editQuestion.exists).ok()
    .click(topMenu.buttons.profileDropdown)
    .click(topMenu.buttons.selling)
    .click(dashboard.nav.questions)
    .click(topicsPage.buttons.editQuestion)
    .typeText(topicsPage.inputs.questionTitle, 'How to sell?', {
      replace: true,
    })
    .click(topicsPage.buttons.submitEdit)
})

test('Add answer', async (t) => {
  await t
    .useRole(randomPersonRole)
    .navigateTo(myUrl + '/posts')
    .click(link.withText('How to sell?'))
    .click(Selector('div.CodeMirror-scroll'))
    .pressKey('a n s w e r')
    .click(topicsPage.buttons.postAnswer)
    .expect(topicsPage.fields.answerBody.withText('answer').exists)
    .ok()
})

test('Add comment', async (t) => {
  await t
    .useRole(randomPersonRole)
    .navigateTo(myUrl + '/posts')
    .click(link.withText('How to sell?'))
    .click(Selector('span').withText('Comment'))
    .typeText(Selector('textarea[name="comment[body]"]'), 'comment')
    .click(Selector('button').withText('Post'))
})

test('Rate question and answer', async (t) => {
  await t
    .useRole(merchantRoleB)
    .navigateTo(myUrl + '/posts')
    .click(link.withText('How to sell?'))
  await
  checkErrors()
  await t
    .click(topicsPage.vote.pointUpQuestion) // rate the question
    .click(topicsPage.vote.pointUpAnswer) // rate the answer
    .expect(topicsPage.fields.questionBody.withText('question').exists)
    .ok()
    .expect(topicsPage.ratings.question.exists)
    .ok()
    .expect(topicsPage.ratings.firstAnswer.exists)
    .ok()
})

test('Delete question', async (t) => {
  await t.useRole(adminRole)
  await t.navigateTo(myUrl + '/dashboard/posts')
  await t
    .setNativeDialogHandler(() => true)
    .click(Selector('button').withAttribute('title', 'Delete'))
})
