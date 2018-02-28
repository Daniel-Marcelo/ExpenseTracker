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
  }

  ionViewDidEnter() {

    setTimeout(() => {
      this.mainSearchBar.setFocus();
      this.keyboard.show();
    }, 0);
    
  }

  getCategories() {

    if (this.searchString && this.searchString.trim() !== '') {
      this.categories = this.categoryService.getCategories(this.searchString);
    }
  }

  categorySelected(selectedCategory: string) {
    if (selectedCategory) {
      this.viewCtrl.dismiss(selectedCategory);
    }
  }

  delete(category: string) {
    this.categoryService.deleteCategory(category)
    .then(
      (categories: Set<string>) => this.categories = categories ? categories : new Set<string>()
    );
    // this.getCategories();
  }

}
