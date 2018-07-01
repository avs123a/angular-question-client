import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionFormComponent } from './question-form/question-form.component';
import { ResultComponent } from './result/result.component';
import { SubmitSuccessComponent } from './submit-success/submit-success.component';

const routes: Routes = [
    {path: '', component: QuestionFormComponent},
    {path: 'result', component: ResultComponent},
    {path: 'responses', component: SubmitSuccessComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
