import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
    currentUser: any;
    constructor(private http: HttpClient, private router: Router) { }
    loginUser(username: string, password: string) {
        const users = {
            username,
            password
        };
        const options = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };
        this.http.post("/api/users", users, options).toPromise().then(() => {
            this.http.get("/api/currentUser", options).subscribe(res => {
                this.currentUser = res[0];
                this.router.navigate(["/food"]);
            });
        }).catch(() => {
            console.log("Invalid");
            this.currentUser = undefined;
        });
    }
    loggedIn() {
        return !!this.currentUser;
    }
    logout() {
        const options = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };
        this.http.delete("/api/currentUser/0", options).subscribe(() => {
            this.router.navigate(["/food"]);
            this.currentUser = undefined;
        });
    }
    updateCurrentUser(nickname: string, email: string) {
        this.currentUser.nickname = nickname;
        this.currentUser.email = email;

        const options = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };
        return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
    }
    checkAuthStatus() {
        this.http.get("/api/currentUser").subscribe(data => {
            if (data[0]) {
                this.currentUser = data[0];
            }
        });
    }
}
