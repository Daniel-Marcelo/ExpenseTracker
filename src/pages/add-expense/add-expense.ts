import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from 'ionic-angular';
import { SelectCategoryPage } from '../select-category/select-category';
import { Expense } from '../../models/expense.model';
import { ExpenseService } from '../../services/expense.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    selector: 'add-expense',
    templateUrl: 'add-expense.html'
})

export class AddExpense implements OnInit {

    categoryString: string;
    amountString: string;
    dateString: string;
    descriptionString: string;
    expense: Expense;
    createExpenseForm: FormGroup;

    ionViewDidEnter() {
        this.createExpenseForm.reset();
        this.dateString = new Date().toISOString();
    }

    ngOnInit() {
        this.createExpenseForm = new FormGroup({
            'category': new FormControl(this.categoryString, [
                Validators.required
            ]),
            'amount': new FormControl(this.amountString, [
                Validators.required
            ]),
            'date': new FormControl(this.dateString, [
                Validators.required
            ]),
            'description': new FormControl(this.descriptionString)
        });
    }

    constructor(public modalCtrl: ModalController, public expenseService: ExpenseService, public toastCtrl: ToastController) {
        this.expense = new Expense();
    }

    openCategorySelectionModal() {

        let profileModal = this.modalCtrl.create(SelectCategoryPage);

        profileModal.onDidDismiss(selectedCategory => {
            if (selectedCategory) {
                this.categoryString = selectedCategory;
            }
        })
        profileModal.present();
    }

    doSaveExpense() {
        this.expense.category = this.categoryString;
        this.expense.description = this.descriptionString;
        this.expense.date = new Date(this.dateString).toLocaleDateString();
        this.expense.amount = parseFloat(this.amountString);

        this.expenseService.addExpense(this.expense);
        this.expense = new Expense();
        this.createExpenseForm.reset();
        this.showSuccessToastMessage();
    }

    showSuccessToastMessage() {
        const toast = this.toastCtrl.create({
            message: 'Expense saved successfully',
            duration: 1000,
            position: 'bottom'
        });
        toast.present();
    }

    get category() { return this.createExpenseForm.get('category'); }

    get amount() { return this.createExpenseForm.get('amount'); }

    get date() { return this.createExpenseForm.get('date'); }

}