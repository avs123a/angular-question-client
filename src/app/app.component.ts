import { Component, OnInit } from '@angular/core';
import { UserService } from './user/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  title = 'Questionnaire';
  userId: number;
  userFullName: string;

  isLoggedIn: boolean;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit() {
        //  get current user if logged in
      this.userFullName = this.userService.getCurrentUserFullName();
  }

    //  redirect to field list (link click)
  redirectFieldList() {
      this.router.navigate(['fields']);
  }

    // redirect to response list (link click)
  redirectResponsesList() {
      this.router.navigate(['responses']);
  }

    // redirect to login page (link click)
  redirectLoginPage() {
      this.router.navigate(['login']);
  }

    // redirect to edit profile page (link click)
  redirectEditProfile() {
      this.router.navigate(['edit-profile']);
  }

    // redirect to change password page (link click)
  redirectChangePassword() {
      this.router.navigate(['change-password']);
  }

    // log out (link click)
  logOut() {
      this.userService.userLogout();
      this.router.navigate(['login']);
  }

}
