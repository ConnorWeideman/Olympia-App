import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FoodService, FoodModel, ReviewModel, restrictedWords } from "src/app/data";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/users/auth.service";
import { IUser } from "src/app/users/user.model";

@Component({
    selector: "reviews",
    templateUrl: "./food-reviews.component.html",
    styleUrls: ["./food-reviews.component.css"]
})
export class FoodReviewsComponent {
    currentFood: FoodModel;
    foodData: FoodModel[];
    addFood: boolean = false;
    newReviewForm: FormGroup;
    food: FormControl;
    review: FormControl;
    rating: FormControl;
    private currentUser: IUser;
    sub;

    constructor(private route: ActivatedRoute, private foodService: FoodService, private authService: AuthService) {
    }
    // tslint:disable-next-line: use-lifecycle-interface
    ngOnInit() {
        this.currentUser = this.authService.currentUser;
        this.currentFood = this.route.snapshot.data["food"];
        this.foodData = this.route.snapshot.data["foods"];
        this.food = new FormControl(this.currentFood.name);
        this.review = new FormControl("", [Validators.required, Validators.maxLength(400), restrictedWords()]);
        this.rating = new FormControl("5");
        this.newReviewForm = new FormGroup({
            food: this.food,
            review: this.review,
            rating: this.rating
        });
        this.sub = this.route.queryParams.subscribe(params => {
            this.addFood = params.addReview;
        });
    }
    openForm() {
        if (!this.authService.loggedIn()) {
            window.alert("You must be logged in to leave a review.");
            return;
        }
        this.addFood = !this.addFood;
    }
    saveReview(formValues) {
        if (!this.authService.loggedIn()) {
            window.alert("You must be logged in to leave a review.");
            return;
        }
        let nextId;
        if (this.currentFood.reviews.length > 0) {
            nextId = Math.max.apply(null, this.currentFood.reviews.map(f => f.id)) + 1;
        } else { nextId = 0; }
        const review: ReviewModel = {
            food: formValues.food,
            rating: +formValues.rating,
            review: formValues.review,
            userId: this.currentUser.id,
            userNickname: this.currentUser.nickname,
            id: nextId
        };
        this.foodService.addReview(review).subscribe(() => {
            this.currentFood.reviews.unshift(review);
        });
        this.openForm();
    }
    cancel() {
        this.addFood = !this.addFood;
    }
    async removeReview(review) {
        const sure = await confirm("Are you sure you want to permanently delete this review?");
        if (!sure) { return; }
        this.currentFood.reviews = this.currentFood.reviews.filter(currReview => {
            return currReview !== review;
        });
        this.foodService.removeReview(review.id, this.currentFood.name).subscribe();
    }
}
