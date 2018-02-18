import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';

@Injectable()
export class ExpenseService {

    expenses: Expense[] = [];
    expenseCategories: string[] = [];
    aggregatedExpenses: Expense[] = [];

    getExpenses(): Expense[] {
        return this.expenses;
    }

    getAggregatedExpenses(): Expense[] {
        return this.aggregatedExpenses;
    }

    addExpense(expense: Expense): void {
        if (expense) {
            this.expenses.push(expense);

            if (this.doesAggregationExist(expense.category)) {
                this.updateAggregation(expense);
            } else {

                const aggregatedExpense: Expense = new Expense();
                
                aggregatedExpense.category = expense.category;
                aggregatedExpense.amount = expense.amount;

                this.expenseCategories.push(expense.category);
                this.aggregatedExpenses.push(aggregatedExpense);
            }
        }
    }

    doesAggregationExist(category: string): boolean{
        return this.expenseCategories.indexOf(category) >= 0
    }

    updateAggregation(expense: Expense): void {
        for (const aggregatedExpense of this.aggregatedExpenses) {
            if (expense.category === aggregatedExpense.category) {
                aggregatedExpense.amount += expense.amount;
            }
        }
    }
}