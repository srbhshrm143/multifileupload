import { Selector, t } from 'testcafe';

class SellerOrderDetailsPage {
    constructor() {
        this.backIntoStockCheckbox = Selector('input[data-tc="sold-order-cancel-checkbox]"')
        this.backIntoStockLabel = Selector('input[data-tc="sold-order-cancel-checkbox"]').sibling(0)
        this.buttons = {
            accept: Selector('button').withText('Accept'),
            cancelOrder: Selector('button').withText('Cancel order and manage stock'),
            markAsCompleted: Selector('button').withText('Mark as completed'),
            markAsDelivered: Selector('button').withText('Mark as delivered'),
        }
        this.cancellationSubtitle = Selector('h3.subtitle').withText('Cancelled order')
        this.deliveryInformationInput = Selector('input[name="order_delivery[delivery_information]"]')
        this.deliveryStatusIndicator = Selector('span[data-tc="delivery-status"]')
        this.orderCompletionStatusIndicator = Selector('span[data-tc="order-completion-status"]')
        this.paymentStatusIndicator = Selector('span[data-tc="payment-status"]')
        this.title = Selector('.bigtitle')
    }

    async acceptOrder () {
        await t.expect(this.buttons.accept.exists).ok()
        await t.hover(this.buttons.accept)
        await t.click(this.buttons.accept)
    }

    async markOrderAsCompleted () {
        await t.expect(this.buttons.markAsCompleted.exists).ok()
        await t.hover(this.buttons.markAsCompleted)
        await t.click(this.buttons.markAsCompleted)
    }

    async markOrderAsDelivered () {
        await t
            .typeText(this.deliveryInformationInput, 'Delivered', { paste: true })
            .expect(this.deliveryInformationInput.exists).ok()
            .hover(this.deliveryInformationInput)
            .click(this.buttons.markAsDelivered)
    }
}

export default new SellerOrderDetailsPage()
