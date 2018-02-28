export class Expense {
    amount: number;
    date: Date;
    category: string;

    constructor(amount?: number, category?: string) {
        if(amount && category) {
            this.amount = amount;
            this.category = category;
        }
    }

}