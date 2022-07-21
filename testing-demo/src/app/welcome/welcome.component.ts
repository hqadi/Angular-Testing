import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
    welcome = '';

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit(): void {
        this.welcome = this.userService.isLoggedIn
            ? `Welcome ${this.userService.user.name}!` : 'Please log in.'
    }

    goToLightSwitch(): void {
        this.router.navigate(['light-switch']);
    }
}
