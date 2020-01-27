export class FoodModel {
    id: number;
    name: string;
    description: string;
    price: number;
    photo: string;
    instructions?: string;
    allergens?: string;
    type: {
        vegetarian: boolean;
        lowCarb: boolean;
        dessert: boolean;
        lunchbox: boolean;
        platter: boolean;
    };
    reviews: ReviewModel[];
    rating: number;
}

export class ReviewModel {
    food: string;
    review: string;
    rating: number;
    userId: number;
    userNickname: string;
    id: number;
}
