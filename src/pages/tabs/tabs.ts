import { Component } from '@angular/core';
import { AddCategory } from '../add-category/add-category';
import { AddExpense } from '../add-expense/add-expense';
import { ChartsPage } from '../charts/charts';
import { ExpensesPage } from '../expenses/expenses';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = AddExpense;
  tab2Root = ExpensesPage;
  tab3Root = AddCategory;
  tab4Root = ChartsPage;
}
