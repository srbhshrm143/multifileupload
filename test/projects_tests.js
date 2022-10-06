import { ClientFunction } from 'testcafe';
import { adminRole, randomPersonRole } from './pages/roles'
import {
    myUrl,
    topMenu,
    challenge,
    challengeCommented,
    challengeUpdated,
    projectDetailsPage,
    projectManagePage,
    projectPublicPage,
} from './pages/fixtures'
import {
    checkErrors,
    createChallenge,
    updateChallenge
} from './pages/helper'

const getWindowLocation = ClientFunction(() => window.location)

fixture`Challenges`
    .page(myUrl)
    .before(async ctx => {
        ctx.challengeId = null
    })
    .beforeEach(async t => {
        await t
            .useRole(adminRole)
            .click(topMenu.buttons.profileDropdown)
            .click(topMenu.profileDropdown.projects)
    })
    .meta('concurrency', 'false')

test('Create a challenge and verify it actually exists in the system', async (t) => {

    const expectedName = challenge.name

    await createChallenge(challenge)

    const location = await getWindowLocation()
    const challengeUrl = location.href
    t.fixtureCtx.challengeId = challengeUrl.substring(challengeUrl.lastIndexOf('/') + 1)
    const challengeId = t.fixtureCtx.challengeId

    // As an admin, check the challenge's name and summary as displayed
    // at the challenge's details page
    await t
        .expect(projectDetailsPage.name.innerText).eql(challenge.name)
        .expect(projectDetailsPage.summary.innerText).eql(challenge.summary)
        .navigateTo('../projects/manage')

    // As an admin, check the challenge's name as displayed
    // at admin's /projects/manage page. The challenge is identified by its ID.
    const projectList = projectManagePage.projectsList
    const managedProject = projectList.find(`ul[data-project-id="${challengeId}"]`)
    const managedProjectLink = managedProject.child('li').nth(1)

    await t.expect(managedProjectLink.innerText).eql(expectedName)

    // As a random user, check the challenge's name as displayed
    // at public /projects page. The challenge is identified by its ID.
    await t
        .useRole(randomPersonRole)
        .navigateTo('../projects')

    const publicProjectsList = projectPublicPage.projectCards
    const publicProjectCard = publicProjectsList.find(
        `article[data-project-id="${challengeId}"]`)
    const publicProjectLink = publicProjectCard.find('a.text-content')
    const statusIndicator = publicProjectCard.find('time > strong.text-content')

    await t
        .expect(publicProjectLink.innerText).eql(expectedName)
        .expect(statusIndicator.innerText).eql('Open')
})

test('Update a challenge and verify the change is visible', async (t) => {

    const expectedName = challengeUpdated.name
    const challengeId = t.fixtureCtx.challengeId

    const projectList = projectManagePage.projectsList
    const managedProject = projectList.find(`ul[data-project-id="${challengeId}"]`)
    const managedProjectLink = managedProject.child('li').nth(1)
    const editButton = managedProject.find('a.button[title="Edit"]')

    await t.click(editButton)

    await updateChallenge(challengeUpdated)

    // As an admin, check the challenge's name after update as displayed
    // at admin's /projects/manage page. The challenge is identified by its ID.
    await t.expect(managedProjectLink.innerText).eql(challengeUpdated.name)

    // As a random user, check the challenge's name as displayed
    // at public /projects page. The challenge is identified by its ID.
    await t
        .useRole(randomPersonRole)
        .navigateTo('../projects')

    const publicProjectsList = projectPublicPage.projectCards
    const publicProjectCard = publicProjectsList.find(
        `article[data-project-id="${challengeId}"]`)
    const publicProjectLink = publicProjectCard.find('a.text-content')

    await t.expect(publicProjectLink.innerText).eql(expectedName)

})

test('Post a comment on a challenge page', async (t) => {

    const challengeId = t.fixtureCtx.challengeId

    await t
        .navigateTo('../projects')

    const publicProjectsList = projectPublicPage.projectCards
    const publicProjectCard = publicProjectsList.find(
        `article[data-project-id="${challengeId}"]`)
    const publicProjectLink = publicProjectCard.find('a.text-content')

    await t
        .click(publicProjectLink)
        .click(projectDetailsPage.button.comments)
        .click(projectDetailsPage.commentInputBox)
        .typeText(projectDetailsPage.commentInputBox, challengeCommented.comment)
        .click(projectDetailsPage.button.post)

    // As a random user, check if the posted comment is visible in the Comments tab
    // at public /projects/[project id] page.
    await t
        .useRole(randomPersonRole)
        .navigateTo('../projects')
        .click(publicProjectLink)
        .click(projectDetailsPage.button.comments)
        .expect(projectDetailsPage.commentBox.innerText).eql(challengeCommented.comment)

})

test('Delete a challenge and verify it no longer exists in the system', async (t) => {

    const challengeId = t.fixtureCtx.challengeId

    const projectList = projectManagePage.projectsList
    const managedProject = projectList.find(`ul[data-project-id="${challengeId}"]`)
    const deleteButton = managedProject.find('button.button[title="Delete"]')

    // As an admin, delete the challenge and verify if it isn't listed anymore
    // at admin's /projects/manage page. The challenge is identified by its ID.
    await t
        .setNativeDialogHandler(() => true)
        .click(deleteButton)
        .expect(deleteButton.exists).notOk()

    // As a random user, check if the deleted challenge isn't listed anymore
    // at public /projects page. The challenge is identified by its ID.
    await t
        .useRole(randomPersonRole)
        .navigateTo('../projects')

    const publicProjectsList = projectPublicPage.projectCards
    const publicProjectCard = publicProjectsList.find(
        `article[data-project-id="${challengeId}"]`)

    await t.expect(publicProjectCard.exists).notOk()

})
