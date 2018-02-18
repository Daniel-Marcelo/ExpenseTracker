import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExpenseService } from '../../services/expense.service';
import { Chart } from 'chart.js';
import { Expense } from '../../models/expense.model';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public expenseService: ExpenseService) {
  }

  ionViewWillEnter() {
    console.log('About to enter');
    this.barChart.data.labels = this.getLabels();
    this.barChart.data.data = this.getData();
    this.barChart.update();
  }

  ionViewDidLoad() {

    const labels = this.getLabels();
    const data = this.getData();

    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '# of Votes',
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }

    });
  }

  getLabels(): string[] {
    const aggregatedExpenses: Expense[] = this.expenseService.getAggregatedExpenses();
    const labels: string[] = [];

    for(const aggregatedExpense of aggregatedExpenses) {
      labels.push(aggregatedExpense.category);
    }
    return labels;
  }

  getData(): number[] {
    const aggregatedExpenses: Expense[] = this.expenseService.getAggregatedExpenses();
    const data: number[] = [];

    for(const aggregatedExpense of aggregatedExpenses) {
      data.push(aggregatedExpense.amount);
    }
    return data;
  }

}
