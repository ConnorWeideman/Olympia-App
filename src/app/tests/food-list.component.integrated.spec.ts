import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { FoodListComponent, FoodComponent } from "../food/index";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { FoodService, FoodModel } from "../data";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

describe("FoodListComponent", () => {
    let fixture: ComponentFixture<FoodListComponent>;
    let component: FoodListComponent;
    let element: HTMLElement;
    let debugEl: DebugElement;

    beforeEach(async(() => {
        const mockFoodService = {};

        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [
                FoodListComponent,
                FoodComponent
            ],
            providers: [
                {
                    provide: Router,
                    useClass: class { navigate = jasmine.createSpy("navigate"); }
                },
                RouterLink,
                { provide: FoodService, useValue: mockFoodService }
            ],
            schemas: []
        });
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(FoodListComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        debugEl = fixture.debugElement;
    });

    describe("initial display", () => {
        it("should display all the foods", () => {
            component.foodData = [
                { name: "Chicken", type: { vegan: true }, rating: 2 },
                { name: "Pie", type: { lowCarb: true }, rating: 4 },
                { name: "Cheese", type: { lowCarb: true }, rating: 3 },
                { name: "Rice", type: { vegan: true }, rating: 5 }
            ] as FoodModel[];
            component.visibleFood = component.foodData;

            component.filter("vegan");

            expect(element.querySelectorAll("food").length).toBe(2);
        });
    });
});
