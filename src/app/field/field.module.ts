import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FieldRoutingModule } from './field-routing.module';
import { FieldListComponent } from './field-list/field-list.component';
import { FieldFormComponent } from './field-form/field-form.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FieldRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [FieldListComponent, FieldFormComponent]
})
export class FieldModule { }
