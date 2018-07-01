import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FieldFormComponent } from './field-form/field-form.component';
import { FieldListComponent } from './field-list/field-list.component';

const routes: Routes = [
    {path: '', component: FieldFormComponent},
    {path: 'fields', component: FieldListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FieldRoutingModule { }
