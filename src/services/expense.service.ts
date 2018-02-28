import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';
import { Storage } from '@ionic/storage';
import { Budget } from '../models/budget.model';

@Injectable()
export class ExpenseService {

    expenses: Expense[] = [];
    expenseCategories: string[] = [];
    aggregatedExpenses: Expense[] = [];

    constructor(private storage: Storage) {

        this.storage.get('expenses').then((val) => {
            this.expenses = val ? val : [];
        });

        this.storage.get('aggregatedExpenses').then((val) => {
            this.aggregatedExpenses = val ? val : [];
        });

        this.storage.get('expenseCategories').then((val) => {
            this.expenseCategories = val ? val : [];
        });
    }


    getExpenses(budget: Budget): Promise<Expense[]> {

        let expenses: Expense[] = [];

        return <Promise<Expense[]>>this.storage.get('expenses').then((val) => {
            expenses = val ? val : [];

            expenses.filter((expense: Expense) => {
                return expense.date >= budget.startDate && expense.date <= budget.endDate;
            });

            return expenses;
        });

    }

    getAggregatedExpenses(): Expense[] {
        return this.aggregatedExpenses;
    }

    addExpense(expense: Expense): void {
        if (expense) {
            this.expenses.push(expense);
            this.storage.set('expenses', this.expenses);

            if (this.doesAggregationExist(expense.category)) {
                this.updateAggregation(expense);
            } else {

                const aggregatedExpense: Expense = new Expense();

                aggregatedExpense.category = expense.category;
                aggregatedExpense.amount = expense.amount;

                this.expenseCategories.push(expense.category);
                this.aggregatedExpenses.push(aggregatedExpense);

                this.storage.set('aggregatedExpenses', this.aggregatedExpenses);
                this.storage.set('expenseCategories', this.expenseCategories);

            }
        }
    }

    doesAggregationExist(category: string): boolean {
        return this.expenseCategories.indexOf(category) >= 0;
    }

    updateAggregation(expense: Expense): void {
        for (const aggregatedExpense of this.aggregatedExpenses) {
            if (expense.category === aggregatedExpense.category) {
                aggregatedExpense.amount += expense.amount;
            }
        }

        this.storage.set('aggregatedExpenses', this.aggregatedExpenses);
    }

}