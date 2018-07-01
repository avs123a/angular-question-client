import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers: [UserService]
})
export class ChangePasswordComponent implements OnInit {

  id: number;
  user: User;

  ChangePasswordForm: FormGroup;

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {

      this.id = this.userService.getCurrentUserId();   // check if user is logged in

      if (this.id) {
        this.ChangePasswordForm = new FormGroup({
          oldPassword: new FormControl('', Validators.required),
          newPassword: new FormControl('', Validators.required),
          newPassword2: new FormControl('', Validators.required)
        });

        this.userService.findById(this.id).subscribe(
          user => {
            this.user = user;
          }, error => {
            console.log(error);
          }
        );

      } else {
        this.router.navigate(['login']);
      }
  }

  onSubmit() {
    if (this.ChangePasswordForm.valid) {
        let newPassword: string = this.ChangePasswordForm.controls['newPassword'].value;
        let newPassword2: string = this.ChangePasswordForm.controls['newPassword2'].value;
        let oldPassword: string = this.ChangePasswordForm.controls['oldPassword'].value;
        if (newPassword === newPassword2 && oldPassword === this.user.password) {
          let user: User = new User(this.id,
            this.user.firstName,
            this.user.lastName,
            this.user.email,
            newPassword,
            this.user.phone);
          this.userService.updateUser(user).subscribe();
        } else {
            console.log('ERROR!!! password must be equal and old password must be correct!!!');
        }
    }

    this.ChangePasswordForm.reset();
    this.router.navigate(['']);
  }

}
