import { Component } from '@angular/core';
import { AddCategory } from '../add-category/add-category';
import { AddExpense } from '../add-expense/add-expense';
import { ChartsPage } from '../charts/charts';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AddExpense;
  tab2Root = AddCategory;
  tab3Root = ChartsPage;

}
