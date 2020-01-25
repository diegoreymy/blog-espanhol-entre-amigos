import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.buildContactForm();
  }

  buildContactForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      message: ['', Validators.required]
    });
  }

  get formFields() {
    return this.form.controls;
  }

  getErrorMessage() {
    return this.form.controls.email.hasError('required') ? 'Este campo es obligatorio' :
      this.form.controls.email.hasError('email') ? 'Ese email no es correcto' :
        '';
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
  }

}
