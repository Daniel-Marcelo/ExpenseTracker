import { Component, ViewChild } from '@angular/core';
import { NavController, ToastController, NavParams, Navbar, ViewController } from 'ionic-angular';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import { Budget } from '../../models/budget.model';

/**
 * 
 * Generated class for the CreateBudgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'expenses-by-category',
    templateUrl: 'expenses-by-category.html',
})
export class ExpensesByCategoryPage {

    categorizedExpenses: Array<Expense>;
    category: string;
    budget: Budget;
    @ViewChild(Navbar) navBar: Navbar;

    constructor(public navCtrl: NavController, public viewController: ViewController, public toastCtrl: ToastController, private expenseService: ExpenseService, private navParams: NavParams) {
        this.category = this.navParams.get('category');
        this.budget = this.navParams.get('budget');
    }

    ionViewDidEnter(): void {
        this.getExpenses();
    }

    getExpenses(): void {
        this.expenseService.getExpensesByCategory(this.category).then(
            (expenses: Array<Expense>) => {
                const filteredExpenses = this.budget ? this.expenseService.filterExpenses(expenses, this.budget) : expenses;
                this.categorizedExpenses = filteredExpenses;
            }
        );

    }

    deleteExpense(expense: Expense) {
        this.expenseService.deleteExpense(expense).then(
            (isSuccessfullyDeleted: boolean): void => this.getExpenses()
        );
    }
}
