import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Budget } from '../../models/budget.model';
import {BudgetService } from '../../services/budget.service';
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
export class CreateBudgetPage {

  budget: Budget;

  constructor(private budgetService: BudgetService, public navCtrl: NavController, public navParams: NavParams) {
    this.budget = new Budget();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateBudgetPage');
  }

  doCreateBudget() {
    this.budgetService.createBudget(this.budget);
  }
}
