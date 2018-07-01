import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { QuestionFormComponent } from './question-form/question-form.component';
import { ResultComponent } from './result/result.component';
import { SubmitSuccessComponent } from './submit-success/submit-success.component';

@NgModule({
  imports: [
    CommonModule,
    QuestionRoutingModule
  ],
  declarations: [QuestionFormComponent, ResultComponent, SubmitSuccessComponent]
})
export class QuestionModule { }
