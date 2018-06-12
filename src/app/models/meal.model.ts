import { MealType } from './meal-type';
import { Preparation } from './preparation.model';

export class Meal extends Preparation {
    timeStamp: Date;
    mealType: MealType;
}
