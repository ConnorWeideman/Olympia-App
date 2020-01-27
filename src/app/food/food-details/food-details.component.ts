import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FoodModel, FoodService } from "src/app/data/index";
import { AuthService } from "src/app/users/auth.service";

@Component({
    templateUrl: "./food-details.component.html",
    styleUrls: ["./food-details.component.css"]
})

export class FoodDetailsComponent {
    food: FoodModel;
    constructor(private foodService: FoodService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {

    }
    // tslint:disable-next-line: use-lifecycle-interface
    ngOnInit(): void {
        console.log(this.route.snapshot.data);
        this.food = this.route.snapshot.data["food"];
        console.log("In component " + this.food);
    }
    return() {
        console.log("Returning");
        this.router.navigate(["/food"]);
    }
    reviews() {
        this.router.navigate(["/food", this.food.name, "reviews"]);
    }
    addReviews() {
        this.router.navigate(["/food", this.food.name, "reviews"], { queryParams: { addReview: true } });
    }
}
