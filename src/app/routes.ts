import { Routes } from "@angular/router";
import { FoodNotFoundComponent } from "./errors/food-not-found.component";
import { FoodListResolver } from "./data/index";
import {
    FoodListComponent,
    FoodDetailsComponent,
    FoodReviewsComponent,
    AddFoodComponent,
    FoodResolver
} from "./food/index";
import {
    MyMenuComponent,
    AddMealComponent,
    MenuAuthService
} from "./my-menu/index";
import { AddFoodAuthService } from "./food/add-food-auth.service";

export const appRoutes: Routes = [
    { path: "food", component: FoodListComponent, resolve: { foods: FoodListResolver } },
    { path: "food/add-food", component: AddFoodComponent, canActivate: [AddFoodAuthService] },
    { path: "food/not-found", component: FoodNotFoundComponent },
    { path: "my-menu", component: MyMenuComponent, canActivate: [MenuAuthService] },
    { path: "my-menu/add", component: AddMealComponent, canDeactivate: ["canDeactivateAddFood"], resolve: { foods: FoodListResolver } },
    { path: "food/:name", component: FoodDetailsComponent, resolve: { food: FoodResolver } },
    { path: "food/:name/reviews", component: FoodReviewsComponent, resolve: { foods: FoodListResolver, food: FoodResolver } },
    { path: "", redirectTo: "/food", pathMatch: "full" },
    { path: "user", loadChildren: "./users/user.module#UserModule" }
];
