import { Component, OnInit } from '@angular/core';
import { Field, FieldOption } from '../../field/field';
import { Response1, ResponseField } from '../question';
import { FieldService } from '../../field/field.service';
import { UserService } from '../../user/user.service';
import { QuestionService } from '../question.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
  providers: [FieldService, UserService, QuestionService]
})
export class QuestionFormComponent implements OnInit {

  fields: Field[];
  userId: number;

  questionForm: FormGroup;

  constructor(private router: Router,
              private userService: UserService,
              private fieldService: FieldService,
              private questionService: QuestionService) { }

  ngOnInit() {
    this.userId = this.userService.getCurrentUserId();   // check if user is logged in and get User ID 
    
    if (this.userId) {
        this.fieldService.findAllActive().subscribe(
          fields => {
            this.fields = fields;
          }, error => {
            console.log(error);
          }
        );
        
        this.questionForm = new FormGroup({
          questionFields: new FormArray([])
          
          //oldPassword: new FormControl('', Validators.required),
          //newPassword: new FormControl('', Validators.required),
          //newPassword2: new FormControl('', Validators.required)
        });
        
        for (let field in this.fields) {
            
            
            
          (<FormArray>this.questionForm.get('questionFields')).push(
			new FormGroup({
				
				
			})
          );
        }
        

    } else {
      this.router.navigate(['login']);
    }
   
   
   
  }
  
  
  
  onSubmit() {
	  
	  
	  
  }

}
