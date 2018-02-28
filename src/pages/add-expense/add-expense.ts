import { Component, ViewChild } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { SelectCategoryPage } from '../select-category/select-category';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'add-expense',
    templateUrl: 'add-expense.html'
})

export class AddExpense {

    expense: Expense;
    @ViewChild('addExpenseForm') form: NgForm;

    constructor(public modalCtrl: ModalController, public expenseService: ExpenseService) {
        this.expense = new Expense();
    }

    openCategorySelectionModal() {

        let profileModal = this.modalCtrl.create(SelectCategoryPage);

        profileModal.onDidDismiss(selectedCategory => {
            this.expense.category = selectedCategory;
        });

        profileModal.present();

    }

    doSaveExpense() {
        this.expense.amount = parseFloat(<any>this.expense.amount);
        this.expenseService.addExpense(this.expense);
        this.expense = new Expense();
        this.form.reset();
    }
}