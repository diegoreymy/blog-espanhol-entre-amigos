import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { ContactComponent } from './contact.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ContactService } from 'src/app/shared/services/contact.service';
import { of } from 'rxjs';
import { IEmail } from 'src/app/shared/models/iEmail.model';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

const responseContactService = {email: 'diegoreymy@gmail.com', name: 'Diego', message: 'mensaje de prueba'};
const requestContactService = {email: 'diegoreymy@gmail.com', name: 'Diego', message: 'mensaje de prueba'};

class MockContactService {
  sendEmail(data: IEmail) {
    return of(requestContactService);
  }
}

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
    declarations: [ContactComponent],
    schemas: [NO_ERRORS_SCHEMA],
    imports: [ReactiveFormsModule],
    providers: [{ provide: ContactService, useClass: MockContactService }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getErrorMessage when email is not empty', () => {
    component.form.controls.email.setValue('test@test.com');
    const errorMessage = component.getErrorMessage();
    expect(errorMessage).not.toEqual('Este campo es obligatorio');
  });

  it('should getErrorMessage when email is invalid', () => {
    component.form.controls.email.setValue('test');
    const errorMessage = component.getErrorMessage();
    expect(errorMessage).not.toEqual('Este campo es obligatorio');
  });

  it('should onSubmit with form valid', fakeAsync(() => {
    component.form.controls.email.setValue('diegoreymy@gmail.com');
    component.form.controls.name.setValue('Diego');
    component.form.controls.message.setValue('prueba unitario del formulario');
    component.onSubmit();
    expect(component.textButton).toContain('Su mensaje ha sido enviado');
    expect(component.submitted).toEqual(true);
    tick(5000);
    expect(component.textButton).toContain('Enviar');
    expect(component.submitted).toEqual(false);
  }));

  it('should onSubmit with form invalid', () => {
    component.form.controls.email.setValue('');
    component.form.controls.name.setValue('');
    component.form.controls.message.setValue('');
    component.onSubmit();
    expect(component.form.valid).toEqual(false);
    expect(component.textButton).toContain('Enviar');
  });

  it('should send email', () => {
    component.form.controls.email.setValue('diegoreymy@gmail.com');
    component.form.controls.name.setValue('Diego');
    component.form.controls.message.setValue('prueba unitario del formulario');
    spyOn(MockContactService.prototype, 'sendEmail').withArgs(requestContactService).and.returnValue(of(responseContactService));
    expect(component.form.valid).toEqual(true);
  });
});
