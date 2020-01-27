import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { FoodService } from "../data/food.service";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable()
export class FoodResolver implements Resolve<any> {
    constructor(private foodService: FoodService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.foodService.getFood(route.params["name"]);
    }
}
