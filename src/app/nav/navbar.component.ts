import { Component } from "@angular/core";
import { AuthService } from "../users/auth.service";

@Component({
    selector: "navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.css"]
})
export class NavComponent {
    constructor(private authService: AuthService) {

    }
}
