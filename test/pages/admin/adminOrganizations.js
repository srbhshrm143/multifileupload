import { Selector } from 'testcafe';

class AdminOrganizationsPage {
  constructor() {
    this.url = '/admin/organizations/',
    this.organization = Selector('ul[data-tc="admin-panel-organization"]').find('a')
    this.buttons = {
      inviteMerchantAdmin: Selector('a').withText('Invite merchant admin'),
      sendInvitation: Selector('button').withText('Send invitation')
    }
    this.inputs = {
      firstName:  Selector('#first_name'),
      lastName: Selector('#last_name'),
      email:  Selector('#email')
    }
    this.flags = {
      superAdmin: Selector('input[name="permissions[superadmin]"]'),
      admin: Selector('input[name="permissions[admin]"]'),
      maker: Selector('input[name="permissions[maker]"]'),
      checker: Selector('input[name="permissions[checker]"]'),
    }
  }
}

export default new AdminOrganizationsPage()
