import { BaseEntity } from ".";

export const TransactionType = {
    INCOME: 1,
    OUTCOME: 2,
}
export class Transaction extends BaseEntity {
    constructor() {
        super();
        this.description = "";
        this.price = 0;
        this.priceStr = "";
        this.date = new Date();
        this.type = TransactionType.INCOME
    }
}