import { Categorie } from './../../../models/categorie.model';
import { PreparationService } from 'src/app/services/preparation.service';
import { Component, Inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSelectChange } from '../../../../../node_modules/@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-save-as-recipe',
  templateUrl: './save-as-recipe.component.html',
  styleUrls: ['./save-as-recipe.component.css']
})
export class SaveAsRecipeComponent implements OnInit {

  name: string;
  comment: string;
  category: Categorie;
  title: string;
  bt1Label: string;
  bt2Label: string;

  // Categories to display for this ingredient
  categories: Array<Categorie> = [];


  constructor(
    private preparationService: PreparationService,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.initCategoriesList();
   }

  ngOnInit() {
    if (this.data.name) {this.name = this.data.name; }
    if (this.data.category) {this.category = this.data.category; }
    if (this.data.comment) {this.comment = this.data.comment; }
    if (this.data.mode === 'SAVE') {
        console.log('Categories', this.categories);
        this.category = this.categories[3];
        this.title = 'Sauvegarder la préparation en tant que recette';
        this.bt1Label = 'Enregistrer';
        this.bt2Label = 'Abandonner';
    }
    if (this.data.mode === 'EDIT') {
      this.title = 'Editer les infos de la recette';
      this.bt1Label = 'Ok';
      this.bt2Label = 'Annuler';
    }
  }

  onSubmit() {
    switch (this.data.mode) {
      case 'SAVE' : {
        console.log('Sauvegarde de la recette ' + this.name + '\n' + this.comment);
        this.preparationService.savePreparationAsRecipe(this.name, this.comment, this.category);
        break;
      }

      case 'EDIT' : {
        this.preparationService.preparation.name = this.name;
        this.preparationService.preparation.comment = this.comment;
        this.preparationService.preparation.category = this.category;
        this.preparationService.setStatut('MAJ infos');
        break;
      }
    }

  }


  initCategoriesList() {
    this.categoryService.getCategories().subscribe(
      (categories: Categorie[]) => {
        this.categories = categories;

        if (this.data.mode === 'SAVE') {
          // pour eviter que la nouvelle prepration soit sauvegardée sans catégorie, catégorie par défaut
          this.category = this.categories[3];
        }
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
