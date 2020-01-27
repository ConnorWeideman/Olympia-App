import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { restrictedWords } from "../data";

@Component({
    templateUrl: "/profile.component.html",
    styleUrls: ["/profile.component.css"]
})
export class ProfileComponent implements OnInit {
    profileForm: FormGroup;
    nickname: FormControl;
    email: FormControl;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.nickname = new FormControl(this.authService.currentUser.nickname, [Validators.required, restrictedWords()]);
        this.email = new FormControl(this.authService.currentUser.email, [Validators.email]);
        this.profileForm = new FormGroup({
            nickname: this.nickname,
            email: this.email
        });
    }
    saveProfile(formValues) {
        if (this.profileForm.valid) {
            this.authService.updateCurrentUser(formValues.nickname, formValues.emai).subscribe(() => {
                this.router.navigate(["food"]);
            });
        }
    }
    cancel() {
        this.router.navigate(["food"]);
    }
    logout() {
        this.authService.logout();
    }
    nicknameValid() {
        return this.nickname.valid || this.nickname.untouched;
    }
    emailValid() {
        return this.email.valid || this.email.untouched;
    }
}
