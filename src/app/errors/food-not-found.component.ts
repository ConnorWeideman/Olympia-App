import { Component } from "@angular/core";

@Component({
    template: `
    <section>
        <h1>The food you are looking for could not be found.</h1>
        <a [routerLink]="['/food']">Return...</a>
    </section>
    `,
    styles: [`
        section {
            padding: 100px;
        }
        a {
            text-decoration: none;
        }`]
})
export class FoodNotFoundComponent {

}
