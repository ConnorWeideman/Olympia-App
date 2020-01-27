import { Injectable, EventEmitter } from "@angular/core";
import { Subject, Observable, of } from "rxjs";
import { FoodModel, ReviewModel } from "./food.model";
import { FoodReviewsComponent, ReviewListComponent } from "../food";
import { } from "events";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class FoodService {
    constructor(private http: HttpClient) { }
    private handleError<T>(operation = "operation", result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            return of(result as T);
        };
    }
    private calculateRating(food: FoodModel) {
        let totalStars = 0;
        food.reviews.forEach(review => {
            totalStars += review.rating;
        });
        return totalStars / food.reviews.length;
    }
    getFoods(): Observable<FoodModel[]> {
        return this.http.get<FoodModel[]>("/api/foods").pipe(catchError(this.handleError<FoodModel[]>("getFoods", [])));
    }
    getFood(name: string): Observable<FoodModel> {
        return this.http.get<FoodModel>("/api/foods?name=" + name, { responseType: "json" }).pipe(map(res => {
            return res[0];
        })).pipe(catchError(this.handleError<FoodModel>("getFood")));
    }
    addFood(food: FoodModel): Observable<any> {
        food.reviews = [];
        const options = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };
        return this.http.post<FoodModel>("/api/foods", food, options).pipe(catchError(this.handleError<FoodModel[]>("addFood", [])));
    }
    addReview(review: ReviewModel) {
        return this.getFood(review.food).pipe(map(food => {
            food.reviews.unshift(review);
            food.rating = this.calculateRating(food);
            this.http.put("/api/foods", food).subscribe();
        })
        ).pipe(catchError(this.handleError<FoodModel[]>("addReview", [])));
    }
    removeReview(reviewId: number, foodName: string) {
        return this.getFood(foodName).pipe(map(food => {
            console.log(food);
            food.reviews = food.reviews.filter(review => {
                console.log(review);
                return review.id !== reviewId;
            });
            food.rating = this.calculateRating(food);
            this.http.put("/api/foods/", food).subscribe();
        })
        ).pipe(catchError(this.handleError<FoodModel[]>("removeReview", [])));
    }
    searchFoods(searchTerm): Observable<any> {
        return this.http.get("/api/foods/?name=" + searchTerm).pipe(catchError(this.handleError<FoodModel[]>("addFood", [])));
    }
}
