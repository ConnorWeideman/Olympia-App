import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ReviewModel } from "src/app/data";
import { AuthService } from "src/app/users/auth.service";

@Component({
    selector: "review-list",
    templateUrl: "./review-list.component.html",
    styleUrls: ["./review-list.component.css"]
})
export class ReviewListComponent {
    @Output() removeReviewEmitter = new EventEmitter();
    @Input() reviews: ReviewModel[];
    constructor(private authService: AuthService) { }
    removeReview(review) {
        this.removeReviewEmitter.emit(review);
    }
}
