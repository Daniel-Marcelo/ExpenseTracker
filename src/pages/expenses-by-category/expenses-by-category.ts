import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';

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

    constructor(public navCtrl: NavController, public toastCtrl: ToastController, private expenseService: ExpenseService, private navParams: NavParams) {
        this.category = this.navParams.get('category');
    }

    ionViewDidEnter(): void {
        this.getExpensesByCategory();
    }

    getExpensesByCategory(): void {
        this.expenseService.getExpensesByCategory(this.category).then(
            (expenses: Array<Expense>) => {
                this.categorizedExpenses = expenses;
            }
        );
    }

    deleteExpense(expense: Expense) {
        this.expenseService.deleteExpense(expense).then(
            (isSuccessfullyDeleted: boolean): void => this.getExpensesByCategory()
        );
    }
}
