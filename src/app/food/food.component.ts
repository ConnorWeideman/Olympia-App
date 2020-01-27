import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FoodModel } from "../data";

@Component({
    selector: "food",
    // templateUrl: "./food.component.html",
    template: `
<collapsible-food class="food" (click)="foodClick()">
    <div collapsible-title [routerLink]="['/food', food.name]">
        <img src="{{food.photo | img}}" alt="{{food.name}}">
        <h2 [ngClass]="headerStyle()">{{food.name}}</h2>
    </div>
    <div collapsible-body class="body" [routerLink]="['/food', food.name]">
        <p>{{food.description}}</p>
        <p [ngStyle]="priceStyle()">{{food.price | currency:"USD"}}</p>
        <div [hidden]="!food?.instructions" class="instructions">
            <p>{{food.instructions}}</p>
        </div>
        <div *ngIf="food?.allergens" [ngSwitch]="food.allergens">
            <h3>Allergens:</h3>
            <p *ngSwitchCase='"Dairy"'>Contains Dairy</p>
            <p *ngSwitchCase='"Egg"'>Contains Egg</p>
            <p *ngSwitchDefault>Contains Pontential Allergens</p>
        </div>
        <div class="rating">
            <img *ngIf="food.rating > 0" src="./assets/images/star.png">
            <img *ngIf="food.rating > 1" src="./assets/images/star.png">
            <img *ngIf="food.rating > 2" src="./assets/images/star.png">
            <img *ngIf="food.rating > 3" src="./assets/images/star.png">
            <img *ngIf="food.rating > 4" src="./assets/images/star.png">
        </div>
    </div>
</collapsible-food>
    `,
    styleUrls: ["./food.component.css"]
})

export class FoodComponent {
    @Input() food: FoodModel;
    @Output() eventClick = new EventEmitter();
    value: any = "Food";
    foodClick() {
        this.eventClick.emit(this.food.name);
    }
    headerStyle() {
        const arr = [];
        if (this.food.type.vegetarian === true) {
            arr.push("green");
        } else
            if (this.food.type.lowCarb === true) {
                arr.push("yellow");
            }
        if (this.food.allergens) {
            arr.push("bold");
        }
        return arr;
    }
    priceStyle() {
        if (this.food.price < 150) {
            return { color: "#0A0", "font-weight": "bolder" };
        } else { return {}; }
    }
}
