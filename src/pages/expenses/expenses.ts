import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import { ExpensesByCategoryPage } from '../expenses-by-category/expenses-by-category';

/**
 * 
 * Generated class for the CreateBudgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'expenses',
    templateUrl: 'expenses.html',
})
export class ExpensesPage {

    expenses: Array<Expense>;

    constructor(public navCtrl: NavController, public toastCtrl: ToastController, private expenseService: ExpenseService) {}

    ionViewDidEnter() {
        this.expenseService.getAggregatedExpenses().then(
            (expenses: Array<Expense>) => this.expenses = expenses
        );
    }

    expenseCategorySelected(category: string) {
        this.navCtrl.push(ExpensesByCategoryPage, {category: category});
    }
}
