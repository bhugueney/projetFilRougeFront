import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';
import { PreparationService } from '../../services/preparation.service';
import { Categorie } from 'src/app/models/categorie.model';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { Observable, of as observableOf} from 'rxjs';
import { MatDialog } from '../../../../node_modules/@angular/material/dialog';
import { DialogYesNoComponent } from 'src/app/components/dialog-yes-no/dialog-yes-no.component';
import { DialogOkComponent } from 'src/app/components/dialog-ok/dialog-ok.component';


export class CategoryNode {
  id: number;
  name: string;
  childrenCategs: CategoryNode[];
  recipe: Recipe;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.childrenCategs = new Array<CategoryNode>();
    this.recipe = null;
  }

}

/** Flat node with expandable and level information */
export class CategoryFlatNode {
  constructor(
    public expandable: boolean, public name: string, public level: number, public recipe: Recipe) {}
}

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeComponent implements OnInit {
  recipeList: Recipe[];
  categoriesTree: CategoryNode = new CategoryNode(0, 'Root');
  HasRecipes = false;


  treeControl: FlatTreeControl<CategoryFlatNode>;
  treeFlattener: MatTreeFlattener<CategoryNode, CategoryFlatNode>;
  dataSource: MatTreeFlatDataSource<CategoryNode, CategoryFlatNode>;

  constructor(private recipeService: RecipeService,
              private preparationService: PreparationService,
              private router: Router,
              private dialog: MatDialog,
              private changeDetectorRef: ChangeDetectorRef
             ) {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel, this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<CategoryFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data  = this.categoriesTree.childrenCategs;
    this.refresh();
  }

  ngOnInit() {
  }

  public refresh() {
    // call recipe service to get all Recipe. When returned initialize recipeList with returned content
    this.recipeService.getAll()
    .subscribe( (returnedRecipeList: Recipe[]) => {
      this.recipeList = returnedRecipeList;
      console.log('returnedRecipeList = ', returnedRecipeList);
      this.HasRecipes = (returnedRecipeList.length > 0 );
      this.categoriesTree = new CategoryNode(0, 'Root'); // reinit the tree
      this.getCategTree(this.recipeList);
      console.log('categoriesTree : ', this.categoriesTree);
      this.dataSource.data  = this.categoriesTree.childrenCategs;
      this.treeControl.expandAll();
      console.log('dataSource', this.dataSource);
      this.changeDetectorRef.markForCheck(); // to force a refresh of this component to refresh the recipe list
    }) ;


  }


  private getCategTree(recipeList: Recipe[]) {
    recipeList.forEach( (recipe: Recipe) => {
      console.log('Name = ' + recipe.name);
      this.browseRecipeCategories(recipe.category, recipe);
    });
  }

  private browseRecipeCategories(category: Categorie, recipe: Recipe) {
    if (category.parent !== null) {
      this.browseRecipeCategories(category.parent, recipe);
    }
    const categNode = this.searchCategAndAddCategIfNotExists(category);
    if (categNode) {
      // if categorieNode found or created, and categNode.id equals recipe.Category.id then add the recipe as a children node
      if (categNode.id === recipe.category.id) {
        // add the recipe as a children
        const newRecipeNode = new CategoryNode(-1, recipe.name);
        newRecipeNode.recipe = recipe;
        categNode.childrenCategs.push(newRecipeNode);
       }
    }
  }

  private searchCategAndAddCategIfNotExists(category: Categorie): CategoryNode {
    console.log('Categorie parcourue : ' + category.name);
    let result: CategoryNode;
    let categorieNodeFound = this.searchCategoryNodeInCategoriesTree(this.categoriesTree, category);
    if (categorieNodeFound) {
      result = categorieNodeFound;
    } else {
      const newNode = new CategoryNode(category.id, category.name); // create a new node
      if (category.parent === null) {
        // it's a main category so attach it to rootNodeChilds
        this.categoriesTree.childrenCategs.push(newNode);
        result = newNode;
      } else {
        // search if a the parent category exists
        categorieNodeFound = this.searchCategoryNodeInCategoriesTree(this.categoriesTree, category.parent);
        if (categorieNodeFound) {
          // if found add the new node to the found children
          categorieNodeFound.childrenCategs.push(newNode);
          result = newNode;
        }
      }
    }
    return result;
  }


  private searchCategoryNodeInCategoriesTree(categoryNode: CategoryNode, category: Categorie): CategoryNode  {
    let result: CategoryNode = null;
    if (categoryNode.id === category.id) {
      // this category already exists and we have found it
      result = categoryNode;
    } else {
      // we browse each child to find searched category
      categoryNode.childrenCategs.forEach(
        (categoryNodeChild: CategoryNode) => {
          if (result === null) { result = this.searchCategoryNodeInCategoriesTree(categoryNodeChild, category); }
        }
      );
    }
    console.log('result for searchCategoryNodeInCategoriesTree : ', result);
    return result;
  }


  transformer = (node: CategoryNode, level: number) => {
    return new CategoryFlatNode(!!node.childrenCategs, node.name, level, node.recipe);
  }

  private _getLevel = (node: CategoryFlatNode) => node.level;

  private _isExpandable = (node: CategoryFlatNode) => node.expandable;

  private _getChildren = (node: CategoryNode): Observable<CategoryNode[]> => observableOf(node.childrenCategs);

  hasChild = (_: number, _nodeData: CategoryFlatNode) => _nodeData.expandable;





  public deleteRecipe(recipe: Recipe) {
    const dialogRef = this.dialog.open(DialogYesNoComponent,
      {data: {title: 'Confirmation suppression', message: 'Etes-vous sûr de vouloir supprimer cette recette ?'}});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recipeService.delete(recipe)
        .subscribe( (messageFromBack: any) => {
          const dialog2Ref = this.dialog.open(DialogOkComponent, {data: {title: 'Suppression', message: messageFromBack.message}});
          dialog2Ref.afterClosed().subscribe( () => { this.refresh(); } );
        });
      }
    });
  }

}


