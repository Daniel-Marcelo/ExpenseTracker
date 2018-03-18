export class Expense {
    amount: number;
    date: string;
    category: string;
    description: string;

    constructor(amount?: number, category?: string) {
        if (amount && category) {
            this.amount = amount;
            this.category = category;
        }
    }

}