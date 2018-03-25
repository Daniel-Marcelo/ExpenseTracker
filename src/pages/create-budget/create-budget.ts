import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, Toast } from 'ionic-angular';
import { Budget } from '../../models/budget.model';
import { BudgetService } from '../../services/budget.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

/**
 * 
 * Generated class for the CreateBudgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-budget',
  templateUrl: 'create-budget.html',
})
export class CreateBudgetPage implements OnInit {

  budget: Budget;
  startDateString: string;
  endDateString: string;
  createBudgetForm: FormGroup;
  toast: Toast;


  ngOnInit(): void {
    this.createBudgetForm = new FormGroup({
      'startDate': new FormControl(this.budget.startDate, [
        Validators.required
      ]),
      'endDate': new FormControl(this.budget.endDate, [
        Validators.required
      ])
    });
  }

  constructor(private budgetService: BudgetService, public navCtrl: NavController, public toastCtrl: ToastController) {
    this.budget = new Budget();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateBudgetPage');
  }

  doCreateBudget() {

    this.budget.startDate = this.startDateString;
    this.budget.endDate = this.endDateString;
    this.budgetService.createBudget(this.budget);
    this.createBudgetForm.reset();
    this.showSuccessToastMessage();
  }

  get startDate() {
    return this.createBudgetForm.get('startDate');
  }

  get endDate() {
    return this.createBudgetForm.get('endDate');
  }

  getMin() {
    return new Date(this.budget.startDate).toISOString();
  }

  showSuccessToastMessage() {
    const toast = this.toastCtrl.create({
      message: 'Budget saved successfully',
      duration: 1000
    });
    toast.present();
  }
}
