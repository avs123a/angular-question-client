import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService]
})
export class SignupComponent implements OnInit {
  id: number;
  user: User;

  userForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }


  ngOnInit() {
    this.userForm = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.pattern('[^ @]*@[^ @]*')
        ]),
        password: new FormControl('', Validators.required),
        password2: new FormControl('', Validators.required),
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        phone: new FormControl('')
    });
  }

  ngOnDestroy(): void {
  }

  onSubmit() {
    if (this.userForm.valid) {
        if (this.userForm.controls['password'].value == this.userForm.controls['password2'].value){
            let user: User = new User(null,
              this.userForm.controls['firstName'].value,
              this.userForm.controls['lastName'].value,
              this.userForm.controls['email'].value,
              this.userForm.controls['password'].value,
              this.userForm.controls['phone'].value);
              this.userService.saveUser(user).subscribe();
        }
    }
    this.userForm.reset();
    this.router.navigate(['login']);
  }

  redirectLoginPage() {
    this.router.navigate(['login']);

  }

}
