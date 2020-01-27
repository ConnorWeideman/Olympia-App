import { FoodListComponent } from "../food";
import { ActivatedRoute } from "@angular/router";
import { FoodService, FoodModel } from "../data";

describe("FoodListComponent", () => {
    let component: FoodListComponent;
    // tslint:disable-next-line: prefer-const
    let foodService: FoodService;
    const mockRoute = {
        snapshot: {
            data: {
                foods: [
                    { name: "Chicken", type: { vegan: true }, rating: 2 },
                    { name: "Pie", type: { lowCarb: true }, rating: 4 },
                    { name: "Cheese", type: { lowCarb: true }, rating: 3 },
                    { name: "Rice", type: { vegan: true }, rating: 5 }
                ]
            }
        }
    };

    beforeEach(() => {
        component = new FoodListComponent(mockRoute as unknown as ActivatedRoute, foodService);
    });

    describe("filter", () => {
        it("should filter the foods", () => {
            component.sortBy = "rating";
            component.foodData = mockRoute.snapshot.data.foods as FoodModel[];

            component.filter("vegan");

            expect(component.visibleFood.length).toBe(2);
            expect(component.visibleFood[0].rating).toBe(5);
        });
    });
});
