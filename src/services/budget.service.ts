
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Budget } from '../models/budget.model';

@Injectable()
export class BudgetService {

    constructor(private storage: Storage) { }

    createBudget(budget: Budget) {
        if (budget) {
            this.getBudgets().then(
                (budgets: Budget[]) => {
                    budgets.push(budget);
                    this.storage.set('budgets', budgets);
                }
            )
        }
    }

    getBudgets(): Promise<Budget[]> {
        return this.storage.get('budgets').then((budgets: Budget[]) => {
            return budgets ? budgets : [];
        });
    }
}
