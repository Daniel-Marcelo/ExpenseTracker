import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NavController } from 'ionic-angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
    templateUrl: 'add-category.html'
})

export class AddCategory implements OnInit {

    categoryValue: string;
    createCategoryForm: FormGroup;

    ionViewDidEnter(): void {
        this.createCategoryForm.reset();
    }

    ngOnInit() {
        this.createCategoryForm = new FormGroup({
            'category': new FormControl(this.categoryValue, [
                Validators.required
            ])
        });
    }
    constructor(public categoryService: CategoryService, public navController: NavController) { }

    doSaveCategory(): void {
        this.categoryService.addCategory(this.categoryValue);
        this.createCategoryForm.reset();
        this.navController.parent.select(0, {}, true);
    }

    get category() { return this.createCategoryForm.get('category'); }
} 