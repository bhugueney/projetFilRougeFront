import { MealType } from './meal-type';
import { Preparation } from './preparation.model';

export class Meal extends Preparation {
    private _timeStamp: Date;
    private _mealType: MealType;

    public get timeStamp(): Date {
        return this._timeStamp;
    }

    public set timeStamp(value: Date) {
        this._timeStamp = value;
    }

    public get mealType(): MealType {
        return this._mealType;
    }

    public set mealType(value: MealType) {
        this._mealType = value;
    }

}
