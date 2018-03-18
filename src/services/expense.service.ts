import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';
import { Storage } from '@ionic/storage';
import { Budget } from '../models/budget.model';

@Injectable()
export class ExpenseService {

    constructor(private storage: Storage) { }

    deleteExpense(expenseToDelete: Expense): Promise<boolean> {
        return this.getExpenses().then(
            (expenses: Array<Expense>) => {
                const filteredExpenses = expenses.filter((expense) => { return this.areExpensesDifferent(expense, expenseToDelete); })
                this.storage.set("expenses", filteredExpenses);
                return true;
            }
        )
    }

    areExpensesDifferent(expense: Expense, expenseToDelete: Expense): boolean {
        return expense.category !== expenseToDelete.category ||
            expense.amount !== expenseToDelete.amount ||
            expense.date !== expenseToDelete.date ||
            expense.description !== expenseToDelete.description ? true : false;
    }

    getExpenses(budget?: Budget): Promise<Expense[]> {

        return <Promise<Expense[]>>this.storage.get('expenses').then((expenses: Expense[]) => {
            expenses = expenses ? expenses : new Array<Expense>();

            if (expenses && expenses.length > 0 && budget) {
                return this.filterExpenses(expenses, budget);
            } else {
                return expenses;
            }
        });
    }

    sortByDateDescending(expenses: Array<Expense>): Array<Expense> {
        expenses.sort((expenseOne: Expense, expenseTwo: Expense) => {
            return (expenseOne.date < expenseTwo.date) ? 1 :
                (expenseOne.date > expenseTwo.date) ? -1 : 0;
        });

        return expenses;
    }

    getExpensesByCategory(category: string): Promise<Expense[]> {
        return <Promise<Expense[]>>this.storage.get('expenses').then((expenses: Expense[]) => {

            const categoryExpenses: Array<Expense> = new Array<Expense>();

            expenses = expenses ? expenses : new Array<Expense>();

            expenses.forEach((expense) => {
                if (expense.category === category) {
                    categoryExpenses.push(expense);
                }
            });

            return categoryExpenses;
        });
    }

    getAggregatedExpenses(): Promise<Expense[]> {
        return <Promise<Expense[]>>this.getExpenses().then(
            (expenses: Expense[]) => {
                expenses = this.aggregateExpenses(expenses);
                expenses = this.sortByAmount(expenses);
                return expenses;
            }
        );
    }

    aggregateExpenses(expenses: Expense[]): Expense[] {
        const aggregatedExpenses: Expense[] = new Array<Expense>();

        for (let expense of expenses) {
            const isUpdated: boolean = this.updateExistingAggregation(expense, aggregatedExpenses);

            if (!isUpdated) {
                const newAggregatedExpense: Expense = new Expense(expense.amount, expense.category);
                aggregatedExpenses.push(newAggregatedExpense);
            }
        }
        return aggregatedExpenses;
    }

    private sortByAmount(expenses: Array<Expense>): Array<Expense> {
        expenses.sort((expenseOne: Expense, expenseTwo: Expense) => {
            return expenseTwo.amount - expenseOne.amount;
        });
        return expenses;
    }

    private updateExistingAggregation(expense: Expense, aggregatedExpenses: Expense[]) {

        const aggregatedExpense: Expense = aggregatedExpenses.find((aggregatedExpense) => {
            return aggregatedExpense.category === expense.category;
        });

        if (aggregatedExpense) {
            aggregatedExpense.amount += expense.amount;
            return true;
        } else {
            return false;
        }
    }

    private filterExpenses(expenses: Expense[], budget: Budget): Expense[] {
        expenses.filter((expense: Expense) => {
            return new Date(expense.date) >= budget.startDate && new Date(expense.date) <= budget.endDate;
        });

        return expenses;
    }

    addExpense(expense: Expense): void {
        if (expense) {

            this.getExpenses().then(
                (expenses: Expense[]) => {
                    expenses.push(expense);
                    this.storage.set("expenses", expenses);
                }
            );
        }
    }

    addAggregation(expense: Expense) {
        this.storage.get('aggregatedExpenses').then(
            (aggregatedExpenses: Expense[]) => {
                const isAggregationUpdated: boolean = this.updateAggregation(aggregatedExpenses, expense);

                if (!isAggregationUpdated) {
                    const aggregatedExpense: Expense = new Expense(expense.amount, expense.category);

                    aggregatedExpenses.push(aggregatedExpense);
                    this.storage.set("aggregatedExpenses", aggregatedExpenses);
                }
            }
        );
    }

    private updateAggregation(aggregatedExpenses: Expense[], expense: Expense): boolean {

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