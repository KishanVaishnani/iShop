import { Injectable } from '@angular/core';

import {
    Router,
    CanActivate,
} from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate() {
        let userId = localStorage.getItem("UserId");
        if (userId != null && userId != "") {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
