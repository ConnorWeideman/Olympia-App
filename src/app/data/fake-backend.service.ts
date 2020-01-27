import { InMemoryDbService } from "angular-in-memory-web-api";
import { FoodModel } from "./food.model";
import { IUser } from "../users/user.model";
import { Observable } from "rxjs";

export class FakeBackendService implements InMemoryDbService {
    foods: FoodModel[] = [
        {
            id: 0,
            name: "Lasagna",
            description: "Tasty Lasagna to eat",
            price: 100,
            photo: "lasagna.jpg",
            instructions: "Reheat",
            type: {
                vegetarian: true,
                lowCarb: false,
                dessert: false,
                lunchbox: false,
                platter: false
            },
            rating: 5,
            reviews: [
                {
                    food: "Lasagna",
                    review: "Tasty",
                    rating: 5,
                    userId: 1,
                    userNickname: "Steve",
                    id: 0
                },
                {
                    food: "Lasagna",
                    review: "Best I've ever had",
                    rating: 5,
                    userId: 12,
                    userNickname: "Geoffrey",
                    id: 1
                },
                {
                    food: "Lasagna",
                    review: "Quick and easy",
                    rating: 5,
                    userId: 16,
                    userNickname: "Karen",
                    id: 2
                }
            ]
        },
        {
            id: 1,
            name: "Chicken",
            description: "Tasty Chicken to eat",
            price: 200,
            photo: "chicken.jpg",
            allergens: "Egg, Dairy",
            type: {
                vegetarian: false,
                lowCarb: true,
                dessert: false,
                lunchbox: true,
                platter: false
            },
            rating: 4,
            reviews: [
                {
                    food: "Chicken",
                    review: "Tasty",
                    rating: 4,
                    userId: 1,
                    userNickname: "Steve",
                    id: 0
                },
                {
                    food: "Chicken",
                    review: "Best I've ever had",
                    rating: 5,
                    userId: 12,
                    userNickname: "Geoffrey",
                    id: 1
                },
                {
                    food: "Chicken",
                    review: "Quick and easy",
                    rating: 3,
                    userId: 13,
                    userNickname: "Karen",
                    id: 2
                }
            ]
        },
        {
            id: 2,
            name: "Pie",
            description: "Tasty Pie to eat",
            price: 100,
            photo: "pie.jpg",
            allergens: "Gluten",
            type: {
                vegetarian: true,
                lowCarb: false,
                dessert: false,
                lunchbox: false,
                platter: true
            },
            rating: 3,
            reviews: [
                {
                    food: "Pie",
                    review: "Tasty",
                    rating: 3,
                    userId: 1,
                    userNickname: "Steve",
                    id: 0
                },
                {
                    food: "Pie",
                    review: "Best I've ever had",
                    rating: 2,
                    userId: 13,
                    userNickname: "Geoffrey",
                    id: 1
                },
                {
                    food: "Pie",
                    review: "Quick and easy",
                    rating: 4,
                    userId: 14,
                    userNickname: "Karen",
                    id: 2
                }
            ]
        },
        {
            id: 3,
            name: "Milk Tart",
            description: "Tasty Milk Tart to eat",
            price: 150,
            photo: "milk-tart.jpg",
            allergens: "Dairy",
            type: {
                vegetarian: false,
                lowCarb: false,
                dessert: true,
                lunchbox: true,
                platter: false
            },
            rating: 5,
            reviews: [
                {
                    food: "Milk Tart",
                    review: "Tasty",
                    rating: 5,
                    userId: 1,
                    userNickname: "Steve",
                    id: 0
                },
                {
                    food: "Milk Tart",
                    review: "Best I've ever had",
                    rating: 5,
                    userId: 12,
                    userNickname: "Geoffrey",
                    id: 1
                },
                {
                    food: "Milk Tart",
                    review: "Quick and easy",
                    rating: 5,
                    userId: 13,
                    userNickname: "Karen",
                    id: 2
                }
            ]
        }
    ];
    users: IUser[] = [
        {
            id: 0,
            username: "Connor",
            password: "1234",
            nickname: "Trioculus",
            admin: true
        }
    ];
    currentUser: IUser[] = [];
    post(requestInfo) {
        if (requestInfo.collectionName === "users") {
            const response = new Observable((observer) => {
                const login = requestInfo.req.body;
                const matchingUser = this.users.find(user => {
                    return user.username === login.username && user.password === login.password;
                });
                if (matchingUser) {
                    const res = Object.assign({}, matchingUser);
                    res.password = "";
                    this.currentUser.push(res);
                    observer.next(res);
                } else {
                    observer.error("Invalid username or password");
                }
                observer.complete();
            });
            return response;
        } else { return undefined; }
    }
    createDb() {

        return {
            foods: this.foods,
            currentUser: this.currentUser,
            users: this.users
        };
    }
}
