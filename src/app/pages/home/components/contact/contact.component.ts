import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ContactService, IEmailData } from 'src/app/shared/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

  form: UntypedFormGroup;
  submitted = false;
  textButton = 'Enviar';
  private unsubscribe = new Subject<void>();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private contactService: ContactService
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
    const data: IEmailData = {
      name: this.form.controls['name'].value,
      _replyto: this.form.controls['email'].value,
      message: this.form.controls['message'].value
    }
    if (this.form.valid) {
      this.textButton = 'Enviando...';
      this.contactService.sendEmail(this.form.value).subscribe(() => {
        this.submitted = true;
        this.textButton = 'Su mensaje ha sido enviado';
        setTimeout(() => {
          this.textButton = 'Enviar';
          this.submitted = false;
        }, 5000);
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
