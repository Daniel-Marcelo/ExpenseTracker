import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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

  categories: string[];
  @ViewChild("searchBar") mainSearchBar;


  constructor(public viewCtrl: ViewController, public categoryService: CategoryService, public keyboard: Keyboard) {
    this.categories = [];
  }

  ionViewDidLoad() {



  }

  ionViewDidEnter() {
    console.log('this.ionViewDidEnter');
    setTimeout(() => {
      this.mainSearchBar.setFocus();
      this.keyboard.show();
    }, 150);
  }

  getCategories(ev: any) {

    let searchString: string = ev.target.value;

    if (searchString && searchString.trim() !== '') {
      this.categories = this.categoryService.getCategories(searchString);
    }
  }

  categorySelected(selectedCategory: string) {
    if (selectedCategory) {
      this.viewCtrl.dismiss(selectedCategory);
    }

  }

}
