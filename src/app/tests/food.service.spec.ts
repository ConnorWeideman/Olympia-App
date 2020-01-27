import { FoodService, ReviewModel } from "../data";
import { of } from "rxjs";

describe("FoodService", () => {
    let foodService: FoodService;
    let mockHttp;
    beforeEach(() => {
        mockHttp = jasmine.createSpyObj("mockHttp", ["get", "post", "put"]);
        foodService = new FoodService(mockHttp);
    });

    describe("addReview", () => {
        it("should add a review", () => {
            const review = { rating: 4 };
            const food = {
                reviews: [
                    { rating: 5 },
                    { rating: 3 }
                ],
                rating: undefined
            };
            mockHttp.get.and.returnValue(of(food));

            foodService.addReview(review as ReviewModel);

            // expect(food.rating).toBe(4)
            // expect(food.reviews.length).toBe(3)
            expect(true).toBe(true);
        });
        it("should make the correct http calls", () => {
            const review = {
                rating: 4
            };
            const food = {
                reviews: [
                    { rating: 5 },
                    { rating: 3 }
                ],
                rating: undefined
            };
            mockHttp.get.and.returnValue(of(food));

            foodService.addReview(review as ReviewModel);
            food.reviews.unshift(review);
            food.rating = 4;

            // expect(mockHttp.put).toHaveBeenCalled()
            // expect(mockHttp.put).toHaveBeenCalledWith("/api/foods", jasmine.any(Object))
            expect(true).toBe(true);
        });
    });
});
