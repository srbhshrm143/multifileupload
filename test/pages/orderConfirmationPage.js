import { Selector } from 'testcafe';

class OrderConfirmationPage {
    constructor() {
        this.buttons = {
            back: Selector('a').withText("Back"),
            orderConfirmation: Selector('button[type="submit"]').withText('Confirm'),
        }
        this.links = {
            changeShipmentMethod: Selector('a').withText('Change')
        }
        this.prices = {
            delivery: Selector('div[data-tc="order_delivery_costs"]'),
            subtotal: Selector('div[data-tc="order-subtotal"]'),
            total: Selector('div[data-tc="summary-totalprice"]'),
        }
        this.radiobuttons = {
            personalPickup: Selector('input[value="personal_pickup"]')
        }
    }
}

export default new OrderConfirmationPage()
