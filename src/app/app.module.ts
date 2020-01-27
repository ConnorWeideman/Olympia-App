import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/navbar.component";
import { appRoutes } from "./routes";
import { RouterModule } from "@angular/router";
import { FoodNotFoundComponent } from "./errors/food-not-found.component";
import {
  FoodComponent,
  FoodDetailsComponent,
  FoodListComponent,
  FoodReviewsComponent,
  AddFoodComponent,
  ReviewListComponent,
  CollapsibleFood,
  AddFoodAuthService,
  FoodResolver
} from "./food/index";
import {
  MyMenuComponent,
  AddMealComponent,
  MenuAuthService
} from "./my-menu/index";
import {
  FoodService,
  FoodListResolver,
  ImgPipe
} from "./data/index";
import { AuthService } from "./users/auth.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { FakeBackendService } from "./data/fake-backend.service";

@NgModule({
  declarations: [
    AppComponent,
    FoodComponent,
    FoodListComponent,
    NavComponent,
    FoodDetailsComponent,
    FoodNotFoundComponent,
    MyMenuComponent,
    AddMealComponent,
    FoodReviewsComponent,
    AddFoodComponent,
    ReviewListComponent,
    CollapsibleFood,
    ImgPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(FakeBackendService),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    FoodService,
    FoodResolver,
    FoodListResolver,
    AuthService,
    AddFoodAuthService,
    MenuAuthService,
    { provide: "canDeactivateAddFood", useValue: checkAddSaved }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
export function checkAddSaved(component: AddMealComponent) {
  if (!component.saved) {
    return window.confirm("You have unsaved selections. Are you sure you want to leave?");
  } else { return true; }
}
