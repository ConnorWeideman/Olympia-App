import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FoodService } from "../data";

@Component({
    templateUrl: "./add-food.component.html",
    styleUrls: ["./add-food.component.css"]
})
export class AddFoodComponent {
    imgBlur: boolean = true;
    newFood;
    constructor(private router: Router, private foodService: FoodService) {
    }
    // tslint:disable-next-line: use-lifecycle-interface
    ngOnInit() {
        document.querySelector("#photo").addEventListener("blur", () => { this.imgBlur = true; });
        document.querySelector("#photo").addEventListener("focus", () => { this.imgBlur = false; });
    }
    cancel() {
        this.router.navigate(["/food"]);
    }
    saveFood(formValues) {
        this.foodService.addFood(formValues).subscribe(() => {
            this.router.navigate(["/food"]);
        });
    }
}
