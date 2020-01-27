import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";

@Component({
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent {
    username: string;
    password: string;
    mouseoverLogin: boolean;
    loginInvalid: boolean = false;
    constructor(private authService: AuthService, private router: Router) {
    }
    login(formValues) {
        this.authService.loginUser(formValues.username, formValues.password);
        window.setTimeout(() => {
            if (!this.authService.currentUser) {
                this.loginInvalid = true;
            }
        }, 1000);
    }
    cancel() {
        this.router.navigate(["food"]);
    }
}
