import { Ingredient } from './ingredient.model';
import { Recipe } from './recipe.model';

export class RecipeIngredient {
    private _id: number;
    private _quantity: number;
    private _ingredient: Ingredient;
    private _recipe: Recipe;

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get recipe(): Recipe {
        return this._recipe;
    }
    public set recipe(value: Recipe) {
        this._recipe = value;
    }

    public get quantity(): number {
        return this._quantity;
    }
    public set quantity(value: number) {
        this._quantity = value;
    }

    public get ingredient(): Ingredient {
        return this._ingredient;
    }
    public set ingredient(value: Ingredient) {
        this._ingredient = value;
    }

}
