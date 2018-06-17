import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';
import { Storage } from '@ionic/storage';
import { Budget } from '../models/budget.model';

@Injectable()
export class ExpenseService {

    constructor(private storage: Storage) { this.storage.clear() }

    deleteExpense(expenseToDelete: Expense): Promise<boolean> {
        return this.getExpenses().then(
            (expenses) => {
                const filteredExpenses = expenses.filter(expense => this.areExpensesDifferent(expense, expenseToDelete))
                this.storage.set("expenses", filteredExpenses);

                return true;
            }
        );
    }

    getExpenses(budget?: Budget): Promise<Array<Expense>> {

        return <Promise<Array<Expense>>>this.storage.get('expenses').then(
            (expenses: any[]) => {
                expenses = expenses ? expenses : new Array<Expense>();

                return budget ? this.filterExpensesByBudget(expenses, budget) : expenses;
            }
        );
    }

    getExpensesByCategory(category: string): Promise<Array<Expense>> {
        return <Promise<Array<Expense>>>this.getExpenses().then(
            (expenses) => expenses.filter(expense => expense.category === category)
        );
    }

    getAggregatedExpensesByCategory(): Promise<Array<Expense>> {
        return <Promise<Array<Expense>>>this.getExpenses().then(
            (expenses) => {
                expenses = this.aggregateExpensesByCategory(expenses);
                expenses = this.sortByAmount(expenses);
                return expenses;
            }
        );
    }

    getAggregatedExpensesByBudget(budget: Budget): Promise<Array<Expense>> {
        return <Promise<Array<Expense>>>this.getExpenses(budget).then(
            (expenses) => {
                expenses = this.aggregateExpensesByCategory(expenses);
                expenses = this.sortByAmount(expenses);
                return expenses;
            }
        );
    }

    filterExpensesByBudget(expenses: Array<Expense>, budget: Budget): Array<Expense> {
        return expenses.filter(
            (expense) => {
                const expenseDate = new Date(expense.date);
                const startDate = new Date(budget.startDate);
                const endDate = new Date(budget.endDate);

                expenseDate.setHours(0, 0, 0, 0);
                startDate.setHours(0, 0, 0, 0);
                endDate.setHours(0, 0, 0, 0);

                return expenseDate >= startDate && expenseDate <= endDate;
            }
        );
    }

    addExpense(expense: Expense): void {
        if (expense) {
            this.getExpenses().then(
                (expenses) => {
                    expenses.push(expense);
                    this.storage.set("expenses", expenses);
                }
            );
        }
    }

    private aggregateExpensesByCategory(expenses: Array<Expense>): Array<Expense> {
        const aggregatedExpenses = new Array<Expense>();

        for (let expense of expenses) {
            const isUpdated = this.updateExistingAggregation(expense, aggregatedExpenses);

            if (!isUpdated) {
                const newAggregatedExpense = new Expense(expense.amount, expense.category);
                aggregatedExpenses.push(newAggregatedExpense);
            }
        }
        return aggregatedExpenses;
    }

    private areExpensesDifferent(expense: Expense, expenseToDelete: Expense): boolean {
        return expense.category !== expenseToDelete.category ||
            expense.amount !== expenseToDelete.amount ||
            expense.date !== expenseToDelete.date ||
            expense.description !== expenseToDelete.description ? true : false;
    }

    private updateExistingAggregation(expense: Expense, aggregatedExpenses: Array<Expense>): boolean {

        const aggregatedExpense = aggregatedExpenses.find(aggregatedExpense => aggregatedExpense.category === expense.category);

        if (aggregatedExpense) {
            aggregatedExpense.amount += expense.amount;
            return true;
        } else {
            return false;
        }
    }

    private sortByAmount(expenses: Array<Expense>): Array<Expense> {
        return expenses.sort((expenseOne, expenseTwo) => expenseTwo.amount - expenseOne.amount);
    }
}