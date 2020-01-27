import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { FoodService } from "./food.service";
import { map } from "rxjs/operators";

@Injectable()
export class FoodListResolver implements Resolve<any> {
    constructor(private foodService: FoodService) {

    }
    resolve() {
        return this.foodService.getFoods();
    }
}
