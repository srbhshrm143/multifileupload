import { Selector } from 'testcafe';

export default class OrderSellerReviewPage {
    constructor() {
        this.buttons = {
            cancelOrder: Selector('button[type="submit"]').withText('Cancel order and manage stock'),
            markAsCompleted: Selector('button[type="submit"]').withText('Mark as completed'),
            markAsDelivered: Selector('button[type="submit"]').withText('Mark as delivered'),
        }
        this.inputs = {
            deliveryInfo: Selector('input[name="order_delivery[delivery_information]"]'),
            restockItem: Selector('input[data-tc="sold-order-cancel-checkbox"]'),
        }
        this.orderCompleted = Selector('span').withText('COMPLETED')
    }
}