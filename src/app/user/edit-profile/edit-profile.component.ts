import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [UserService]
})
export class EditProfileComponent implements OnInit {

  id: number;
  user: User;

  userEditForm: FormGroup;

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {

      this.id = this.userService.getCurrentUserId(); // check if user is logged in

      if (this.id) {
        this.userEditForm = new FormGroup({
          firstName: new FormControl(''),
          lastName: new FormControl(''),
          email: new FormControl('', [
            Validators.required,
            Validators.pattern('[^ @]*@[^ @]*')
          ]),
          phone: new FormControl('')
        });

        this.userService.findById(this.id).subscribe(
          user => {
            this.userEditForm.patchValue({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phone: user.phone,
            });
          },error => {
            console.log(error);
          }
        );

      } else {
        this.router.navigate(['login']);
      }
  }

  onSubmit() {
    if (this.userEditForm.valid) {
        let user: User = new User(this.id,
          this.userEditForm.controls['firstName'].value,
          this.userEditForm.controls['lastName'].value,
          this.userEditForm.controls['email'].value,
          this.user.password,
          this.userEditForm.controls['phone'].value);
        this.userService.updateUser(user).subscribe();
    }

    this.userEditForm.reset();
    this.router.navigate(['']);
  }

}
