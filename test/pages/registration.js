import { Selector, t } from 'testcafe';

class SignUpPage {
  constructor() {
    this.buttons = {
      signUp: Selector('button').withText('Sign Up')
    }
    this.fieldsets = {
      firstName: Selector('fieldset').withText('First Name'),
      lastName: Selector('fieldset').withText('Last Name'),
      email: Selector('fieldset').withText('E-mail'),
      password: Selector('fieldset').withText('Password'),
      phone: Selector('fieldset').withText('Mobile Number'),
      termsOfService: Selector('fieldset').withText('Terms of Service'),
    }
    this.header = Selector('h1.bigtitle')
    this.inputs = {
      firstName: Selector('#first_name'),
      lastName: Selector('#last_name'),
      email: Selector('#email'),
      password: Selector('#password'),
      phone: Selector('#phone'),
      termsOfService: Selector('#agreed'),
      abCustomer: Selector('#ab_customer')
    }
    this.invalidInputs = {
      firstName: Selector('#first_name').nextSibling(),
      lastName: Selector('#last_name').nextSibling(),
      email: Selector('#email').nextSibling(),
      password: Selector('#password').nextSibling(),
      phone: Selector('#phone').nextSibling(),
      termsOfService: Selector('#agreed').nextSibling(),
    }
    this.labels = {
      firstName: Selector('label[for="first_name"]'),
      lastName: Selector('label[for="last_name"]'),
      email: Selector('label[for="email"]'),
      password: Selector('label[for="password"]'),
      phone: Selector('label[for="phone"]'),
      termsOfService: Selector('label[for="agreed"]'),
    }
  }

  async register(user) {
    await t
      .typeText(this.inputs.firstName, user.firstName, { paste: true, })
      .typeText(this.inputs.lastName, user.lastName, { paste: true, })
      .typeText(this.inputs.email, user.email, { paste: true, })
      .typeText(this.inputs.password, user.password, { paste: true, })
      .click(this.labels.termsOfService)
      .click(this.buttons.signUp)
  }
}

export default new SignUpPage()
