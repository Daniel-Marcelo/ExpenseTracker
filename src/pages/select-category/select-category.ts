import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { CategoryService } from '../../services/category.service';

@IonicPage()
@Component({
  templateUrl: 'select-category.html'
})
export class SelectCategoryPage {

  categories: Array<string>;
  searchString: string;

  constructor(public viewCtrl: ViewController, public categoryService: CategoryService) {
    this.categories = new Array<string>();
    this.searchString = "";
  }

  ionViewDidEnter(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoryService.getCategories().then(
      (categories: Array<string>): void => { this.categories = categories; }
    );
  }

  getCategories(): void {

    if (this.searchString.trim() === '') {
      this.getAllCategories();
    } else {
      this.categoryService.getCategories(this.searchString).then(
        (categories: Array<string>): void => { this.categories = categories; }
      );
    }
  }

  categorySelected(selectedCategory: string) {
    if (selectedCategory) {
      this.viewCtrl.dismiss(selectedCategory);
    }
  }

  deleteCategory(category: string): void {
    this.categoryService.deleteCategory(category).then(
      (categories: Array<string>): void => { this.categories = categories; }
    );
  }
}
