import { ProfileComponent } from "./profile.component";
import { LoginComponent } from "./login.component";
import { ProfileLoggedIn } from "./profile-auth.service";

export const userRoutes = [
    { path: "profile", component: ProfileComponent, canActivate: [ProfileLoggedIn] },
    { path: "login", component: LoginComponent }
];
