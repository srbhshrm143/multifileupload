import { Role, Selector } from 'testcafe'
import { randomPersonRole } from './pages/roles'
import {
  notAuthorizedUser,
  myUrl,
} from './pages/fixtures'

fixture`Security tests`
  .page(myUrl)
  .meta('concurrency', 'true')

test('User without permissions can\'t break into the admin panel', async (t) => {
  await t.useRole(randomPersonRole)

  await t
    .navigateTo(myUrl + '/admin')
    .expect(Selector('div').withText(notAuthorizedUser).exists).ok()
    .expect(myUrl).notContains('/admin')

  await t
    .navigateTo(myUrl + '/admin/users')
    .expect(Selector('div').withText(notAuthorizedUser).exists).ok()
    .expect(myUrl).notContains('/admin')

  await t
    .navigateTo(myUrl + '/admin/orders')
    .expect(myUrl).notContains('/admin')
    .expect(Selector('div').withText(notAuthorizedUser).exists).ok()

  await t
    .navigateTo(myUrl + '/admin/items')
    .expect(myUrl).notContains('/admin')
    .expect(Selector('div').withText(notAuthorizedUser).exists).ok()

  await t.useRole(Role.anonymous())
})
