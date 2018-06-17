
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Budget } from '../models/budget.model';

@Injectable()
export class BudgetService {

    constructor(private storage: Storage) { }

    createBudget(budget: Budget): void {
        if (budget) {
            this.getBudgets().then(
                (budgets: any[]) => {
                    budgets.push(budget);
                    this.storage.set('budgets', budgets);
                }
            )
        }
    }

    getBudgets(): Promise<Budget[]> {
        return this.storage.get('budgets').then((budgets: any[]) => budgets ? budgets : []);
    }
}
