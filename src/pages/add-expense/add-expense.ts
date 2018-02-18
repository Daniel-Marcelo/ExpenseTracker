import { Component } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker';
import { ModalController } from 'ionic-angular';
import { SelectCategoryPage } from '../select-category/select-category';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';

@Component({
    selector: 'add-expense',
    templateUrl: 'add-expense.html'
})

export class AddExpense {

    expense: Expense;

    constructor(private datePicker: DatePicker, public modalCtrl: ModalController, public expenseService: ExpenseService) {
        this.expense = new Expense();
        this.expense.date = "12/12/2017";
    }

    openCategorySelectionModal() {

        let profileModal = this.modalCtrl.create(SelectCategoryPage);
        profileModal.onDidDismiss(selectedCategory => {
            this.expense.category = selectedCategory;
        });
        profileModal.present();

    }

    openDatePicker() {

        this.datePicker.show({
            date: new Date(),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
        }).then(
            date => this.expense.date = date.toLocaleDateString(),
            err => console.log('Error occurred while getting date: ', err)
        );
    }

    doSaveExpense() {
        console.log("SAVED");
        this.expense.amount = parseFloat(<any>this.expense.amount);
        this.expenseService.addExpense(this.expense);
        // this.expenseService.aggregateExpensesByCategory();
    }
}