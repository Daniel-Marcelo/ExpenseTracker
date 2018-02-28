import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class CategoryService {

    constructor(private storage: Storage) {}

    addCategory(category: string): void {
        if (category) {
            this.getCategories().then((categories: Set<string>) => {
                categories.add(category);
                this.storage.set('categories', categories);
            });
        }
    }

    getCategories(searchString?: string): Promise<Set<string>> {

        return <Promise<Set<string>>>this.storage.get('categories').then((categories: Set<string>) => {

            if (categories && categories.size > 0 && searchString) {
                return this.filterCategories(categories, searchString);
            } else {
                return categories;
            }
        });
    }

    deleteCategory(category: string): Promise<Set<string>> {

        return <Promise<Set<string>>>this.getCategories().then((categories: Set<string>) => {
            categories.delete(category);
            this.storage.set('categories', categories);
            return categories;
        });
    }

    private filterCategories(categories: Set<string>, searchString: string): Set<string> {
        const filteredCategories: Set<string> = new Set<string>();

        categories.forEach(category => {
            if (category.toUpperCase().indexOf(searchString.toUpperCase()) >= 0) {
                filteredCategories.add(category);
            }
        });

        return filteredCategories;
    }
}