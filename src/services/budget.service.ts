
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Budget } from '../models/budget.model';

@Injectable()
export class BudgetService {

    budgets: Budget[];

    constructor(private storage: Storage) {

        this.storage.get('budgets').then((val) => {
            this.budgets = val ? val : [];
        });
    }

    createBudget(budget: Budget) {
        if (budget) {
            this.budgets.push(budget);
            this.storage.set('budgets', this.budgets);
        }
    }

    getBudgets(): Budget[] {
        return this.budgets;
    }
}
