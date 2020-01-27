import { Component } from "@angular/core";
import { NavComponent } from "./nav/navbar.component";
import { AuthService } from "./users/auth.service";

@Component({
  selector: "app-root",
  template: `
    <navbar></navbar>
    <router-outlet></router-outlet>
  `,
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private auth: AuthService) { }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.auth.checkAuthStatus();
  }
}
