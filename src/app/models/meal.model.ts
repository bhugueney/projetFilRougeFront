import { MealType } from './meal-type';
import { Preparation } from './preparation.model';

export class Meal extends Preparation {
    private timeStamp: Date;
    private mealType: MealType;


    public getTimeStamp(): Date {
        return this.timeStamp;
    }

    public setTimeStamp(timeStamp: Date) {
        this.timeStamp = timeStamp;
    }

    public getMealType(): MealType {
        return this.mealType;
    }

    public setMealType(mealType: MealType) {
        this.mealType = mealType;
    }
}
