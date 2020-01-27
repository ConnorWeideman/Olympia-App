import { Component, OnInit } from "@angular/core";
import { FoodService } from "../data/food.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    template: `
    <h1>Add A Meal</h1>
    <section id="food-list">
        <div class="food" *ngFor="let food of foods">
            <img *ngIf="food?.photo" src="/assets/images/{{food.photo}}">
            <h2>{{food.name}}</h2>
        </div>
    </section>
    <button>Add</button>
    <button [routerLink]="['/my-menu']">Cancel</button>
    `,
    styleUrls: ["./add-meal.component.css"]
})
export class AddMealComponent implements OnInit {
    foods: any;
    saved: boolean = true;
    constructor(private foodService: FoodService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.foods = this.route.snapshot.data["foods"];
    }
}
