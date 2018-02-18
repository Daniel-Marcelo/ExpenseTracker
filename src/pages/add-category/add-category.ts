import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NavController } from 'ionic-angular';

@Component({
    templateUrl: 'add-category.html'
})

export class AddCategory { 

    category: string;
    categoryService: CategoryService;
    navController: NavController;

    constructor(categoryService: CategoryService, navController: NavController) {
        this.navController = navController;
        this.categoryService = categoryService;
    }

    doSaveCategory() {
        this.categoryService.addCategory(this.category);
        this.navController.parent.select(0, {}, true);
    }
} 