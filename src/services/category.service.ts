import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class CategoryService {

    constructor(private storage: Storage) { }

    addCategory(category: string): void {
        if (category) {
            this.getCategories().then((categories: Array<string>) => {

                if (categories.indexOf(category) < 0) {
                    categories.push(category.toUpperCase());
                }
                this.storage.set('categories', categories);
            });
        }
    }

    getCategories(searchString?: string): Promise<Array<string>> {

        return <Promise<Array<string>>>this.storage.get('categories').then((categories: Array<string>) => {
            categories = categories ? categories : new Array<string>();
            if (categories.length > 0 && searchString) {
                return this.filterCategories(categories, searchString);
            } else {
                return categories;
            }
        });
    }

    deleteCategory(category: string): Promise<Array<string>> {

        return <Promise<Array<string>>>this.getCategories().then(
            (categories: Array<string>) => {
                categories = categories ? categories : new Array<string>();

                let categoryIndex = categories.indexOf(category);
                if (categoryIndex > -1) {
                    categories.splice(categoryIndex, 1);
                }
                this.storage.set('categories', categories);
                return categories;
            }
        );
    }

    private filterCategories(categories: Array<string>, searchString: string): Array<string> {
        return categories.filter(category => category.toUpperCase().indexOf(searchString.toUpperCase()) >= 0);
    }
}