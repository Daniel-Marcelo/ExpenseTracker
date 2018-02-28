import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AddCategory } from '../pages/add-category/add-category';
import { AddExpense } from '../pages/add-expense/add-expense';
import { SelectCategoryPageModule } from '../pages/select-category/select-category.module';
import { ChartsPageModule } from '../pages/charts/charts.module'

import { CategoryService } from '../services/category.service';
import { ExpenseService } from '../services/expense.service';
import { BudgetService } from '../services/budget.service';
import { Keyboard } from '@ionic-native/keyboard'

import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatePicker } from '@ionic-native/date-picker';


import { AutoCompleteModule } from 'primeng/autocomplete';
import { CreateBudgetPageModule } from '../pages/create-budget/create-budget.module';
import { CreateBudgetPage } from '../pages/create-budget/create-budget';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddCategory,
    AddExpense
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AutoCompleteModule,
    SelectCategoryPageModule,
    ChartsPageModule,
    IonicStorageModule.forRoot(),
    CreateBudgetPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddCategory,
    AddExpense,
    CreateBudgetPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CategoryService,
    ExpenseService,
    DatePicker,
    Keyboard,
    BudgetService
  ]
})
export class AppModule { }
