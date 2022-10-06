import { Selector } from 'testcafe';

class AdminSettingsPage {
  constructor() {
    this.url = '/admin/setup'
    this.twoFactorAuthentication = {
      enabled: Selector('#required-2fa-on'),
      disabled: Selector('#required-2fa-off'),
      save: Selector('form[data-tc="2fa"]').find('button').withText('Save')
    }
    this.hCaptcha = {
      enabled: Selector('#captchaOn'),
      disabled: Selector('#captchaOff'),
      save: Selector('form[data-tc="hcaptcha"]').find('button').withText('Save')
    }
    this.complexPassword = {
      enabled: Selector('#passwordPolicyOn'),
      disabled: Selector('#passwordPolicyOff'),
      save: Selector('form[data-tc="complexPassword"]').find('button').withText('Save')
    }
    this.restrictLoginAttempts = {
      input: Selector('input[data-tc="login_attempts_counter"]'),
      save: Selector('form[data-tc="restrictLoginAttempts"]').find('button').withText('Save')
    }
    this.unlockLockedAccounts = {
      input: Selector('input[data-tc="login_attempts_unlock_after_mins"]'),
      save: Selector('form[data-tc="unlockLockedAccounts"]').find('button').withText('Save')
    }
    this.redirectAfterLogging = {
      select: Selector('#afterLoginRedirect'),
      save: Selector('form[data-tc="unlockLockedAafterLoginRedirect"]').find('button').withText('Save'),
      options: {
         homepage: Selector('option').withText('Homepage'),
         userFeed: Selector('option').withText('User\'s feed')
      }
    }
    this.currency = {
      input: Selector('#currency'),
      save: Selector('form[data-tc="currency"]').find('button').withText('Save')
    }
    this.cancelUnpaidOrders = {
      input: Selector('#order-cancel-setup'),
      save: Selector('form[data-tc="cancelUnpaidOrders"]').find('button').withText('Save')
    }
    this.allowOnlyBuyerToPurchase = {
      enabled: Selector('#only-buyers-can-purchase-on'),
      disabled: Selector('#only-buyers-can-purchase-off'),
      save: Selector('form[data-tc="onlyBuyersCanPurchase"]').find('button').withText('Save')
    }
    this.requireAcceptanceForInventoryChanges = {
      enabled: Selector('#inventoryAcceptanceOn'),
      disabled: Selector('#inventoryAcceptanceOff'),
      save: Selector('form[data-tc="requireInventoryAcceptance"]').find('button').withText('Save')
    }
    this.chat = {
      enabled: Selector('#chatOn'),
      disabled: Selector('#chatOff'),
      save: Selector('form[data-tc="chat"]').find('button').withText('Save')
    }
  }
}

export default new AdminSettingsPage()
