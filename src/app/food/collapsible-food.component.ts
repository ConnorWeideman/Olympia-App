import { Component, Output } from "@angular/core";
import { EventEmitter } from "events";

@Component({
    selector: "collapsible-food",
    template: `
        <section class="collapser">
            <ng-content select="[collapsible-title]"></ng-content>
            <ng-content select="[collapsible-body]" *ngIf="visible"></ng-content>
            <div class="block" (click)="toggleContent()">
                <div class="inner-block" [ngClass]="{'visible': visible}"></div>
            </div>
        </section>
    `,
    styleUrls: ["./food.component.css"]
})
export class CollapsibleFood {
    visible: boolean = false;
    toggleContent() {
        this.visible = !this.visible;
    }
}
