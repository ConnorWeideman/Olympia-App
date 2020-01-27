import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/navbar.component";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "./users/auth.service";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavComponent,
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        AuthService
      ]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Olympia App'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("Olympia App");
  });

  it("should render title", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector(".content span").textContent).toContain("Olympia App app is running!");
  });
});
