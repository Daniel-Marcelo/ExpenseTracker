
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { AddCategory } from '../pages/add-category/add-category';
import { AddExpense } from '../pages/add-expense/add-expense';
import { SelectCategoryPageModule } from '../pages/select-category/select-category.module';
import { ExpensesPage } from '../pages/expenses/expenses';
import { ExpensesByCategoryPage } from '../pages/expenses-by-category/expenses-by-category';

import { CategoryService } from '../services/category.service';
import { ExpenseService } from '../services/expense.service';
import { BudgetService } from '../services/budget.service';

import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatePicker } from '@ionic-native/date-picker';


import { AutoCompleteModule } from 'primeng/autocomplete';
import { CreateBudgetPage } from '../pages/create-budget/create-budget';
import { ChartsPage } from '../pages/charts/charts';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    AddCategory,
    AddExpense,
    ChartsPage,
    CreateBudgetPage,
    ExpensesPage,
    ExpensesByCategoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AutoCompleteModule,
    SelectCategoryPageModule,
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    AddCategory,
    AddExpense,
    ChartsPage,
    CreateBudgetPage,
    ExpensesPage,
    ExpensesByCategoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CategoryService,
    ExpenseService,
    DatePicker,
    BudgetService
  ]
})
export class AppModule { }
