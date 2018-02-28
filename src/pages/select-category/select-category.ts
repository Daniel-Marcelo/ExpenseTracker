import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { CategoryService } from '../../services/category.service';

/**
 * Generated class for the SelectCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-category',
  templateUrl: 'select-category.html',
})
export class SelectCategoryPage {

  categories: Set<string>;
  searchString: string;
  @ViewChild("searchBar") mainSearchBar;

  constructor(public viewCtrl: ViewController, public categoryService: CategoryService, public keyboard: Keyboard) {
    this.categories = new Set<string>();
    this.searchString = "";
  }

  ionViewDidEnter() {

    this.getAllCategories();

    setTimeout(() => {
      this.mainSearchBar.setFocus();
      this.keyboard.show();
    }, 0);

  }

  getAllCategories() {

    this.categoryService.getCategories().then(
      (categories: Set<string>) => this.categories = categories ? categories : new Set<string>()
    );
  }

  getCategories() {

    if(this.searchString.trim() === '') {
      this.getAllCategories();
    } else {
      this.categoryService.getCategories(this.searchString).then(
        (categories: Set<string>) => this.categories = categories ? categories : new Set<string>()
      );
    }
  }

  categorySelected(selectedCategory: string) {
    if (selectedCategory) {
      this.viewCtrl.dismiss(selectedCategory);
    }
  }

  deleteCategory(category: string) {
    this.categoryService.deleteCategory(category).then(
      (categories: Set<string>) => this.categories = categories ? categories : new Set<string>()
    );
  }

}
