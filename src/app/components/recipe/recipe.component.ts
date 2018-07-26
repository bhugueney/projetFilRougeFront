import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { PreparationService } from '../../services/preparation.service';
import { Categorie } from 'src/app/models/categorie.model';

export class CategoryNode {
  id: number;
  name: string;
  childrenCategs: CategoryNode[];
  recipeList: Recipe[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.childrenCategs = new Array<CategoryNode>();
  }

}

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipeList: Recipe[];
  categoriesTree: CategoryNode = new CategoryNode(0, 'Root');

  constructor(private recipeService: RecipeService, private preparationService: PreparationService, private router: Router) {
  }

  ngOnInit() {
    // call recipe service to get all Recipe. When returned initialize recipeList with returned content
    this.recipeService.getAll()
    .subscribe( (returnedRecipeList: Recipe[]) => {
      this.recipeList = returnedRecipeList;
      console.log('returnedRecipeList = ', returnedRecipeList);
      this.getCategTree(this.recipeList);
    }) ;
  }

  private getCategTree(recipeList: Recipe[]) {
    recipeList.forEach( (recipe: Recipe) => {
      console.log('Name = ' + recipe.name);
      this.browseRecipeCategories(recipe.category);
    });
  }

  private browseRecipeCategories(category: Categorie) {
    if (category.parent !== null) {
      this.browseRecipeCategories(category.parent);
    }
    this.addCategIfNotExists(category);
  }

  private addCategIfNotExists(category: Categorie) {
    console.log('Categorie parcourue : ' + category.name);
    const categorieNodeFound = this.searchCategoryNodeInCategoriesTree(this.categoriesTree, category);
    console.log('categorieNodeFound : ', categorieNodeFound);
  }


  private searchCategoryNodeInCategoriesTree(categoryNode: CategoryNode, category: Categorie): CategoryNode  {
    let result: CategoryNode = categoryNode;
    if (categoryNode.id === category.id) {
      result = categoryNode;
    } else {
      categoryNode.childrenCategs.forEach(
        (categoryNodeChild: CategoryNode) => {
          if (result === null) { result = this.searchCategoryNodeInCategoriesTree(categoryNodeChild, category); }
        }
      );
    }
    return result;
  }


}
