import { Categorie } from './../../../models/categorie.model';
import { PreparationService } from 'src/app/services/preparation.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSelectChange } from '../../../../../node_modules/@angular/material';

@Component({
  selector: 'app-save-as-recipe',
  templateUrl: './save-as-recipe.component.html',
  styleUrls: ['./save-as-recipe.component.css']
})
export class SaveAsRecipeComponent implements OnInit {

  name: string;
  comment: string;
  category: Categorie;

  // Categories to display for this ingredient
  categories: Array<Categorie> = [];


  constructor(private preparationService: PreparationService, private categoryService: CategoryService) {
    this.initCategoriesList();
   }

  ngOnInit() {
  }

  onSubmit() {
    console.log('Sauvegarde de la recette ' + this.name + '\n' + this.comment);
    this.preparationService.savePreparationAsRecipe(this.name, this.comment, this.category);
  }


  initCategoriesList() {
    this.categoryService.getCategories().subscribe(
      (categories: Categorie[]) => {
        this.categories = categories;
      }
    );
  }

  setCategoryFromSelector(e: MatSelectChange) {
    const categoryId: number = +e.value;
    this.categoryService.getCategoryById(categoryId).subscribe(
      (cat) => { this.category = cat; }
    );
  }

}
