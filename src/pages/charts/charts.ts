import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
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

@Component({
  templateUrl: 'charts.html',
})
export class ChartsPage {

  @ViewChild('barCanvas') barCanvas;
  barChart: Chart;
  budgets: any;
  budget: any;

  constructor(public budgetService: BudgetService, public navCtrl: NavController, public expenseService: ExpenseService) {
  }


  getExpenses(budget: Budget) {

    this.expenseService.getExpenses(budget).then(
      (expenses: Array<Expense>) => {
      });
  }

  getBudgets() {
    this.budgetService.getBudgets().then(
      (budgets: Budget[]) => this.budgets = budgets
    )
  }

  ionViewWillEnter() {
    this.getAggregatedExpenses();
    this.getBudgets();
  }

  ionViewDidLoad() {

    // const labels = this.getLabels();
    // const data = this.getData();
    // const backgroundColors = this.getBackgroundColors();

    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'doughnut',
      data: {
        labels: [],
        datasets: [{
          label: 'Expenses',
          data: [],
          backgroundColor: [],
          hoverBackgroundColor: []
        }]
      }
    });
  }

  getAggregatedExpenses() {
    this.expenseService.getAggregatedExpensesByCategory().then(
      (aggregatedExpenses: Array<Expense>) => {
        const colors: string[] = this.getBackgroundColors(aggregatedExpenses);
        const labels: string[] = this.getLabels(aggregatedExpenses);
        const data: number[] = this.getData(aggregatedExpenses);

        this.updateChart(colors, labels, data);
      }
    );
  }

  updateChart(colors: string[], labels: string[], data: number[]) {
    this.barChart.data.labels = labels;
    this.barChart.data.datasets[0].data = data;
    this.barChart.data.datasets[0].backgroundColor = this.barChart.data.datasets[0].hoverBackgroundColor = colors;
    this.barChart.update();
  }

  getBackgroundColors(aggregatedExpenses: Array<Expense>): string[] {

    // const aggregatedExpenses: Array<Expense> = this.expenseService.getAggregatedExpenses();
    const colors: string[] = []

    for (let expense of aggregatedExpenses) {
      const color = 'rgba(' + this.getRandom() + ', ' + this.getRandom() + ', ' + this.getRandom() + ', 0.2)';
      colors.push(color);
    }

    return colors;
  }

  // getBackgroundColors(): string[] {

  //   this.expenseService.getAggregatedExpenses().then(
  //     (aggregatedExpenses: Array<Expense>) => {
  //       const colors: string[] = [];

  //       for (let expense of aggregatedExpenses) {
  //         const color = 'rgba(' + this.getRandom() + ', ' + this.getRandom() + ', ' + this.getRandom() + ', 0.2)';
  //         colors.push(color);
  //       }
  //       return colors;
  //     }
  //   );


  // }

  getRandom() {
    return Math.floor(Math.random() * 255) + 1
  }

  getLabels(aggregatedExpenses: Array<Expense>): string[] {
    // const aggregatedExpenses: Array<Expense> = this.expenseService.getAggregatedExpenses();
    const labels: string[] = [];

    for (const aggregatedExpense of aggregatedExpenses) {
      labels.push(aggregatedExpense.category);
    }
    return labels;
  }

  getData(aggregatedExpenses: Array<Expense>): number[] {
    // const aggregatedExpenses: Array<Expense> = this.expenseService.getAggregatedExpenses();
    const data: number[] = [];

    for (const aggregatedExpense of aggregatedExpenses) {
      data.push(aggregatedExpense.amount);
    }
    return data;
  }

}
