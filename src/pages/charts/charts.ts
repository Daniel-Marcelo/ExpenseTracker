import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExpenseService } from '../../services/expense.service';
import { BudgetService } from '../../services/budget.service';
import { Chart } from 'chart.js';
import { Expense } from '../../models/expense.model';
import { Budget } from '../../models/budget.model';

/**
 * Generated class for the ChartsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-charts',
  templateUrl: 'charts.html',
})
export class ChartsPage {

  @ViewChild('barCanvas') barCanvas;
  barChart: Chart;
  budgets: any;
  budget: any;

  constructor(public budgetService: BudgetService, public navCtrl: NavController, public navParams: NavParams, public expenseService: ExpenseService) {
  }
  getExpenses(budget: Budget){

    this.expenseService.getExpenses(budget).then(
      (expenses: Expense[]) => {
        this
      });
    alert('l');
  }

  ionViewWillEnter() {
    this.barChart.data.labels = this.getLabels();
    this.barChart.data.datasets[0].data = this.getData();
    this.barChart.data.datasets[0].backgroundColor  = this.barChart.data.datasets[0].hoverBackgroundColor  = this.getBackgroundColors();
    this.barChart.update();

    this.budgets = this.budgetService.getBudgets();
  }

  ionViewDidLoad() {

    const labels = this.getLabels();
    const data = this.getData();

    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: 'Expenses',
          data: data,
          backgroundColor: this.getBackgroundColors(),
          hoverBackgroundColor: this.getBackgroundColors()//,
          // borderWidth: 1
        }]
      }// ,
      // options: {
      //   scales: {
      //     yAxes: [{
      //       ticks: {
      //         beginAtZero: true
      //       }
      //     }]
      //   }
      // }

    });
  }

  getBackgroundColors(): string[] {

    const aggregatedExpenses: Expense[] = this.expenseService.getAggregatedExpenses();
    const colors: string[] = []

    for (let expense of aggregatedExpenses) {
      const color = 'rgba(' + this.getRandom() + ', ' + this.getRandom() + ', ' + this.getRandom() + ', 0.2)';
      colors.push(color);
    }

    return colors;
  }

  getRandom() {
    return Math.floor(Math.random() * 255) + 1
  }

  getLabels(): string[] {
    const aggregatedExpenses: Expense[] = this.expenseService.getAggregatedExpenses();
    const labels: string[] = [];

    for (const aggregatedExpense of aggregatedExpenses) {
      labels.push(aggregatedExpense.category);
    }
    return labels;
  }

  getData(): number[] {
    const aggregatedExpenses: Expense[] = this.expenseService.getAggregatedExpenses();
    const data: number[] = [];

    for (const aggregatedExpense of aggregatedExpenses) {
      data.push(aggregatedExpense.amount);
    }
    return data;
  }

}
