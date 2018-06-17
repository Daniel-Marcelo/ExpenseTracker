import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, ViewController } from 'ionic-angular';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import { ExpensesByCategoryPage } from '../expenses-by-category/expenses-by-category';
import { Budget } from '../../models/budget.model';
import { BudgetService } from '../../services/budget.service';

/**
 * 
 * Generated class for the CreateBudgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    templateUrl: 'expenses.html'
})
export class ExpensesPage {

    budget: Budget;
    budgets: Array<Budget>;
    expenses: Array<Expense>;

    constructor(public navCtrl: NavController, private viewController: ViewController, private expenseService: ExpenseService, private budgetService: BudgetService) { }

    ionViewDidEnter(): void {
        this.getAggregatedExpenses();
        this.getBudgets();
    }

    getAggregatedExpenses() {
        this.expenseService.getAggregatedExpensesByCategory().then(
            (expenses: Array<Expense>) => this.expenses = expenses
        );
    }

    getBudgets() {
        this.budgetService.getBudgets().then(
            (budgets: Array<Budget>) => {
                this.budgets = budgets;
            }
        );
    }

    expenseCategorySelected(category: string): void {
        this.navCtrl.push(ExpensesByCategoryPage, { category: category, budget: this.budget });
    }

    getExpenses(budget: Budget): void {
        this.expenseService.getAggregatedExpensesByBudget(budget).then(
            (expenses: Array<Expense>) => this.expenses = expenses
        );
    }
}
