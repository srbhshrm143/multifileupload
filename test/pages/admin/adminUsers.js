import { Selector } from 'testcafe';

class AdminUsersPage {
  constructor() {
    this.url = '/admin/users/',
    this.user = Selector('ul[data-tc="admin-panel-user"]')
    this.userId= '[data-tc="admin-panel-user-id"]'
    this.buttons = {
      edit: Selector('a').withText('Edit'),
      save: Selector('button').withText('Save'),
      setPassword: Selector('a').withText('Set Password')
    }
    this.flags = {
      superAdmin: Selector('input[name="permissions[superadmin]"]'),
      admin: Selector('input[name="permissions[admin]"]'),
      maker: Selector('input[name="permissions[maker]"]'),
      checker: Selector('input[name="permissions[checker]"]'),
    }
    this.input = {
      password: Selector('input[name="password[password]"]'),
      passwordConfirmation: Selector('input[name="password[password_confirmation]"]')
    }
  }
}

export default new AdminUsersPage()
