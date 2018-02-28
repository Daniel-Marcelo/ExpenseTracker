import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class CategoryService {

    categories: Set<string>;

    constructor(private storage: Storage) {
        // this.storage.get('categories').then((val) => {
        //     this.categories = val ? val : new Set<string>();
        // });
    }

    addCategory(category: string) {
        if (category) {
            this.categories.add(category);
            this.storage.set('categories', this.categories);
        }
    }

    getCategories(searchString: string): Set<string> {

        const filteredCategories: Set<string> = new Set<string>();

        this.categories.forEach(category => {
            if (category.toUpperCase().indexOf(searchString.toUpperCase()) >= 0) {
                filteredCategories.add(category);
            }
        });

        return filteredCategories;
    }

    // deleteCategory(category: string) {
    //     this.categories.delete(category);
    // }

    deleteCategory(category: string): Promise<Set<string>> {

        return <Promise<Set<string>>> this.storage.get('categories').then((categories: Set<string>) => {

            if(categories && categories.size > 0) {
                categories.delete(category);
                this.storage.set("categories", categories);

                return categories;
            }

            return new Set<string>();
        });
    }


}