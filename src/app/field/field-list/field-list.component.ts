import { Component, OnInit } from '@angular/core';
import { Field, FieldOption } from '../field';
import { FieldService } from '../field.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-field-list',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.css'],
  providers: [FieldService]
})
export class FieldListComponent implements OnInit {

  private fields: Field[];

  id: number;
  field: Field;

  options: FieldOption[];

  fieldForm: FormGroup;
  private sub: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private fieldService: FieldService) { }

  ngOnInit() {
    this.getAllFields(); // get fields


      // for create/update form
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

      // create form for fields
    this.fieldForm = new FormGroup({
      label: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      options: new FormControl('', Validators.required),
      required: new FormControl(''),
      active: new FormControl('')
    });


      // edit form
    if (this.id) {
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
         }, error => {
          console.log(error);
         }
      );
    }
  }

    // get fields function
  getAllFields() {
    this.fieldService.findAll().subscribe(
      fields => {
        this.fields = fields;
      },
      err => {
        console.log(err);
      }
    );
  }

    // submit event handler
  onSubmit() {
    if (this.fieldForm.valid) {
      let optionstxt: string[] = this.fieldForm.controls['options'].value.split('\n');   // array of textarea values(options) by row
      let fieldId: number = null; // variable for saving field id if update
      for(let str in optionstxt) {
        if (this.id)
          fieldId = this.id;
        let optionf: FieldOption = new FieldOption(null, fieldId, str);
        this.options.push(optionf); // insert optionf into options array
      }

      if (this.id) {
        let field: Field = new Field(this.id,
          this.fieldForm.controls['label'].value,
          this.fieldForm.controls['type'].value,
          this.fieldForm.controls['options'].value,
          this.fieldForm.controls['required'].value,
          this.fieldForm.controls['active'].value);
        this.fieldService.updateField(field).subscribe(); // update
      } else {
        let field: Field = new Field(null,
          this.fieldForm.controls['label'].value,
          this.fieldForm.controls['type'].value,
          this.fieldForm.controls['options'].value,
          this.fieldForm.controls['required'].value,
          this.fieldForm.controls['active'].value);
        this.fieldService.saveField(field).subscribe(); // create
      }

      this.fieldForm.reset();

    }
  }

  deleteField() {

  }

}
