import { getURL, inaccessiblePages, myUrl } from './pages/fixtures'
import { incompleteProfileRole, } from './pages/roles'


fixture`Testing permissions`
  .page(myUrl)
  .meta('concurrency', 'true')


for (let i in inaccessiblePages) {
  test(`Anonymous user cannot access page: ${inaccessiblePages[i]}`, async (t) => {
    const expectedPath = '/sessions/new'
    await t
      .navigateTo(myUrl + inaccessiblePages[i])
      .expect(getURL()).contains(myUrl + expectedPath)
  })
}

test('User with incomplete profile cannot access specific pages', async (t) => {
  const expectedPath = '/dashboard/profile/edit'
  await t
    .useRole(incompleteProfileRole)
    .navigateTo(myUrl + expectedPath)

  for (let i in inaccessiblePages) {
    await t.navigateTo(myUrl + inaccessiblePages[i])

    const url = await getURL()
    await t.expect(url).contains(myUrl + expectedPath)
  }
})
