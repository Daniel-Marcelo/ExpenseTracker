import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';
import { Storage } from '@ionic/storage';
import { Budget } from '../models/budget.model';

@Injectable()
export class ExpenseService {

    // expenses: Expense[] = [];
    // expenseCategories: string[] = [];
    // aggregatedExpenses: Expense[] = [];

    constructor(private storage: Storage) {

        // this.storage.get('expenses').then((val) => {
        //     this.expenses = val ? val : [];
        // });

        // this.storage.get('aggregatedExpenses').then((val) => {
        //     this.aggregatedExpenses = val ? val : [];
        // });

        // this.storage.get('expenseCategories').then((val) => {
        //     this.expenseCategories = val ? val : [];
        // });
    }


    getExpenses(budget?: Budget): Promise<Expense[]> {

        return <Promise<Expense[]>>this.storage.get('expenses').then((expenses: Expense[]) => {

            if (expenses && expenses.length > 0 && budget) {
                return this.filterExpenses(expenses, budget);
            } else {
                return expenses;
            }
        });
    }

    filterExpenses(expenses: Expense[], budget: Budget): Expense[] {
        expenses.filter((expense: Expense) => {
            return expense.date >= budget.startDate && expense.date <= budget.endDate;
        });

        return expenses;
    }

    // getAggregatedExpenses(): Expense[] {
    //     return this.aggregatedExpenses;
    // }

    addExpense(expense: Expense): void {
        if (expense) {
            // this.expenses.push(expense);
            // this.storage.set('expenses', this.expenses);

            this.getExpenses().then(
                (expenses: Expense[]) => {
                    expenses.push(expense);
                    this.storage.set("expenses", expenses);

                    this.addAggregation(expense);
                }
            )


        }
    }

    addAggregation(expense: Expense) {
        // if (this.doesAggregationExist(expense.category)) {
        //     this.updateAggregation(expense);
        // } else {

        //     const aggregatedExpense: Expense = new Expense();

        //     aggregatedExpense.category = expense.category;
        //     aggregatedExpense.amount = expense.amount;

        //     // this.expenseCategories.push(expense.category);
        //     this.aggregatedExpenses.push(aggregatedExpense);

        //     this.storage.set('aggregatedExpenses', this.aggregatedExpenses);
        //     // this.storage.set('expenseCategories', this.expenseCategories);

        // }

        this.storage.get('aggregatedExpenses').then(
            (aggregatedExpenses: Expense[]) => {
                const isAggregationUpdated: boolean = this.updateAggregation(aggregatedExpenses, expense);

                if(!isAggregationUpdated) {
                    const aggregatedExpense: Expense = new Expense(expense.amount, expense.category);

                    aggregatedExpenses.push(aggregatedExpense);
                    this.storage.set("aggregatedExpenses", aggregatedExpenses);
                }
            }
        );

    }

    // doesAggregationExist(category: string): boolean {
    //     return this.expenseCategories.indexOf(category) >= 0;
    // }

    updateAggregation(aggregatedExpenses: Expense[], expense: Expense): boolean {

        let isAggregationUpdated: boolean = false;

        for (const aggregatedExpense of aggregatedExpenses) {
            if (expense.category === aggregatedExpense.category) {
                aggregatedExpense.amount += expense.amount;
                this.storage.set("aggregatedExpenses", aggregatedExpenses);
                isAggregationUpdated = true;
            }
        }
        return isAggregationUpdated;
    }

}