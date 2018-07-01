import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { User, UserLogin } from '../user';
import { UserService } from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  id: number;
  user: User;

  loginForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }


  ngOnInit() {
      this.loginForm = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.pattern('[^ @]*@[^ @]*')
        ]),
        password: new FormControl('', Validators.required),
        rememberMe: new FormControl('')
    });
  }


  onSubmit() {
    if (this.loginForm.valid) {
        // server auth (get user by email and password from database
        this.userService.userAuth(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value).subscribe(
          user => {
            this.user = user;
          },error => {
            console.log(error);
          }
        );

        // save user in session or local storage
      if (this.loginForm.controls['rememberMe'].value) {
        localStorage.setItem('currentUserId', String(this.user.id));
        localStorage.setItem('currentUserFullName', this.user.firstName + ' ' + this.user.lastName);
      } else {
        sessionStorage.setItem('currentUserId', String(this.user.id));
        sessionStorage.setItem('currentUserFullName', this.user.firstName + ' ' + this.user.lastName);
      }

    }
    this.loginForm.reset();
    this.router.navigate(['']);

  }

}
