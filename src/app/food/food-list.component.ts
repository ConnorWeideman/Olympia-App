import { Component, OnInit } from "@angular/core";
import { FoodService, FoodModel } from "../data/index";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "food-list",
    template: `
        <section class="food-list">
            <div class="title">
                <h1>Our Food</h1>
                <form id="searchForm" (ngSubmit)="searchFoods(searchTerm)">
                    <input [(ngModel)]="searchTerm" type="text" name="search" placeholder="Search Foods...">
                    <button type="submit">Search</button>
                </form>
            </div>
            <div class="filters">
                <nav>
                    <button class="filter" [class.active]="filterBy==='all'" (click)="filter('all')">All</button>
                    <button class="filter" [class.active]="filterBy==='vegetarian'" (click)="filter('vegetarian')">Vegan/Vegetarian</button>
                    <button class="filter" [class.active]="filterBy==='lowCarb'" (click)="filter('lowCarb')">Low-Carb</button>
                    <button class="filter" [class.active]="filterBy==='dessert'" (click)="filter('dessert')">Dessert</button>
                    <button class="filter" [class.active]="filterBy==='lunchbox'" (click)="filter('lunchbox')">Lunchbox</button>
                    <button class="filter" [class.active]="filterBy==='platter'" (click)="filter('platter')">Platter</button>
                </nav>
                <nav class="sort">
                    <h2>Sort:</h2>
                    <button class="filter" [class.active]="sortBy==='name'" (click)="sort('name')">By Name</button>
                    <button class="filter" [class.active]="sortBy==='rating'" (click)="sort('rating')">By Rating</button>
                </nav>
            </div>
            <food *ngFor="let food of visibleFood" (eventClick)="foodClicked($event)" [food]="food"></food>
            <p *ngIf="visibleFood.length === 0" style="padding: 50px">Sorry no foods matched your search.</p>
        </section>
    `,
    styleUrls: ["./food.component.css"]
})
export class FoodListComponent implements OnInit {
    foodData: FoodModel[];
    filterBy: string = "all";
    visibleFood: FoodModel[] = [];
    sortBy: string = "name";
    searchTerm: string = "";

    constructor(private route: ActivatedRoute, private foodService: FoodService) { }
    ngOnInit(): void {
        this.foodData = this.route.snapshot.data.foods;
        this.filter("all");
        this.sort("name");
    }
    searchFoods(searchTerm) {
        this.foodService.searchFoods(searchTerm).subscribe(foods => {
            this.foodData = foods;
            this.filter(this.filterBy);
        });
    }
    foodClicked(data: string) {
        console.log("Loading: " + data);
    }
    filter(filter) {
        this.filterBy = filter;
        if (filter === "all") {
            this.visibleFood = this.foodData.slice(0);
        } else {
            this.visibleFood = this.foodData.filter(food => {
                return food.type[filter];
            });
        }
        this.sort(this.sortBy);
    }
    sort(sort) {
        this.sortBy = sort;
        if (sort === "name") {
            this.visibleFood.sort((f1, f2) => {
                if (f1.name > f2.name) { return 1; }
                if (f1.name === f2.name) { return 0; }
                return -1;
            });
        }
        if (sort === "rating") {
            this.visibleFood.sort((f1, f2) => {
                return f2.rating - f1.rating;
            });
        }
    }
}
