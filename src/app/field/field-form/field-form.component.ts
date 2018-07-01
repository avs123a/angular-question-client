import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldService } from '../field.service';
import { Field, FieldOption } from '../field';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-field-form',
  templateUrl: './field-form.component.html',
  styleUrls: ['./field-form.component.css']
})
export class FieldFormComponent implements OnInit {

  id: number;
  field: Field;

  fieldForm: FormGroup;
  private sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fieldService: FieldService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.fieldForm = new FormGroup({
      label: new FormControl('', Validators.required),
      type: new FormControl(''),
      options: new FormControl(''),
      required: new FormControl(''),
      active: new FormControl('')
    });

    if (this.id) {   // edit form
      this.fieldService.findById(this.id).subscribe(
        field => {
         this.id = field.id;
          this.fieldForm.patchValue({
            label: field.label,
            type: field.type,
            options: field.options,
            required: field.required,
            active: field.active
          });
         },error => {
          console.log(error);
         }
      );

    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {
    if (this.fieldForm.valid) {
      if (this.id) {
        let field: Field = new Field(this.id,
          this.fieldForm.controls['label'].value,
          this.fieldForm.controls['type'].value,
          this.fieldForm.controls['options'].value,
          this.fieldForm.controls['required'].value,
          this.fieldForm.controls['active'].value);
        this.fieldService.updateField(field).subscribe();
      } else {
        let field: Field = new Field(null,
          this.fieldForm.controls['label'].value,
          this.fieldForm.controls['type'].value,
          this.fieldForm.controls['options'].value,
          this.fieldForm.controls['required'].value,
          this.fieldForm.controls['active'].value);
        this.fieldService.saveField(field).subscribe();
      }

      this.fieldForm.reset();
      this.router.navigate(['/']);
    }
  }

  redirectFieldPage() {
    this.router.navigate(['/']);
  }

}
