import { Selector } from 'testcafe';

class PaymentGatewayPage {
    constructor() {
        this.buttons = {
            paymentSuccess: Selector('button[value="success"]'),
            paymentFailed: Selector('button[value="failed"]'),
        }
    }
}

export default new PaymentGatewayPage()
