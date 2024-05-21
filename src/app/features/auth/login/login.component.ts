import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormControl, Validators, UntypedFormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm!: UntypedFormGroup;
    loading!: boolean;

    constructor(private router: Router,
        private titleService: Title,
        private notificationService: NotificationService,
        private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.titleService.setTitle('angular-material-template - Login');
        this.authenticationService.logout();
        this.createForm();
    }

    private createForm() {
        const savedUserUsername = localStorage.getItem('savedUserUsername');

        this.loginForm = new UntypedFormGroup({
            username: new UntypedFormControl(savedUserUsername, [Validators.required]), // Cambiar 'email' por 'username'
            password: new UntypedFormControl('', Validators.required),
            rememberMe: new UntypedFormControl(savedUserUsername !== null) // Cambiar 'email' por 'username'
        });
    }

    login() {
        const username = this.loginForm.get('username')?.value; // Cambiar 'email' por 'username'
        const password = this.loginForm.get('password')?.value;
        const rememberMe = this.loginForm.get('rememberMe')?.value;

        this.loading = true;
        this.authenticationService
            .login(username.toLowerCase(), password) // Cambiar 'email' por 'username'
            .subscribe(
                data => {
                    if (rememberMe) {
                        localStorage.setItem('savedUserUsername', username); // Cambiar 'email' por 'username'
                    } else {
                        localStorage.removeItem('savedUserUsername'); // Cambiar 'email' por 'username'
                    }
                    this.router.navigate(['/']);
                },
                error => {
                    this.notificationService.openSnackBar(error.error);
                    this.loading = false;
                }
            );
    }

    resetPassword() {
        this.router.navigate(['/auth/password-reset-request']);
    }
}
