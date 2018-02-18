import { Injectable } from '@angular/core';

@Injectable()
export class CategoryService {

    categories: string[];

    constructor() {
        this.categories = ['Dab', 'Dan', 'Cab', 'CSN', 'DJS', 'AWO', 'ASDSFD', 'asasdwq'];
    }

    addCategory(category: string) {
        if (category) {
            this.categories.push(category);
        }
    }

    getCategories(searchString?: string): string[] {
        if (searchString) {
            const filteredCategories: string[] = []
            for (const category of this.categories) {
                if (category.toUpperCase().indexOf(searchString.toUpperCase()) >= 0) {
                    filteredCategories.push(category);
                }
            }
            return filteredCategories;
        }
        return this.categories;
    }

}