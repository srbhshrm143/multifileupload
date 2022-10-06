import { Selector, t } from 'testcafe';

class OrderReviewPage {
    constructor() {
        this.buttons = {
            back: Selector('a').withText("Back"),
            orderReviewAndConfirm: Selector('button[type="submit"]').withText('Review and Confirm'),
            orderConfirmation: Selector('button[type="submit"]').withText('Confirm'),
            payNow: Selector('button[value="success"]'),
            payFail: Selector('button[value="failed"]'),
        }
        this.inputs = {
            delivery: Selector('input[value="delivery"]'),
            deliveryBuildingNumber: Selector('#address_building_number'),
            deliveryCity: Selector('#address_city'),
            deliveryCountry: Selector('#address_country'),
            deliveryFlatNumber: Selector('#address_flat_number'),
            deliveryFullName: Selector('#address_full_name'),
            deliveryState: Selector('#address_state'),
            deliveryStreet: Selector('#address_street'),
            deliveryZip: Selector('#address_zip'),
            email: Selector('#shipping_email'),
            firstName: Selector('#shipping_first_name'),
            lastName: Selector('#shipping_last_name'),
            paymentExample: Selector('#payment_type_example'),
            personalPickup: Selector('input[value="personal_pickup"]'),
            phone: Selector('#shipping_phone'),
            returnDescription: ('#reason_details'),
            returnReason: ('#reason'),
            visible: Selector('section[data-tc="shipping-method"] fieldset:not([disabled]) input[type="text"]'),
        }
        this.labels = {
            personalPickup: Selector('label').withText('Personal pickup at one of the Store pickup points (FREE)'),
            homeDelivery: Selector('label').withText('Home delivery'),
            examplePayment: Selector('label').withText('Example Payment')
        }
        this.paymentOK = Selector('p.text-confirmation').withText('Your payment was successful')
        this.prices = {
            delivery: Selector('div[data-tc="order_delivery_costs"]'),
            subtotal: Selector('div[data-tc="order-subtotal"]'),
            total: Selector('div[data-tc="summary-totalprice"]'),
        }
        this.orderHistoryLink = Selector('p > a[href="/dashboard/buy/orders"]')
        this.radiobuttons = {
            homeDelivery: Selector('input[value="delivery"]'),
            personalPickup: Selector('input[value="personal_pickup"]'),
        }
        this.shippingMethodSection = Selector('section[data-tc="shipping-method"]')
        this.inProgressIndicator = Selector('span').withText('IN PROGRESS')
        this.viewOrderDetailsLink = Selector('a').withText('View details')
    }

    async fillInHomeDeliveryForm(i=0, fullName, country, city, state, street, zip, buildingNumber, flatNumber, 
        saveAsDefault=false) {
      await t
        .typeText(this.inputs.deliveryFullName.nth(i), fullName, { paste: true, replace: true })
        .typeText(this.inputs.deliveryCountry.nth(i), country, { paste: true, replace: true })
        .typeText(this.inputs.deliveryCity.nth(i), city, { paste: true, replace: true })
        .typeText(this.inputs.deliveryState.nth(i), state, { paste: true, replace: true })
        .typeText(this.inputs.deliveryStreet.nth(i), street, { paste: true, replace: true })
        .typeText(this.inputs.deliveryZip.nth(i), zip, { paste: true, replace: true })
        .typeText(this.inputs.deliveryBuildingNumber.nth(i), buildingNumber, { paste: true, replace: true })
        .typeText(this.inputs.deliveryFlatNumber.nth(i), flatNumber, { paste: true, replace: true })
        if (saveAsDefault === true) {
            await t.click(orderReviewPage.inputs.saveAsDefault.nth(i))
        }
    }
}

export default new OrderReviewPage()
