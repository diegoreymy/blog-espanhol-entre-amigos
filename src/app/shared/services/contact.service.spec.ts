import { TestBed, getTestBed } from '@angular/core/testing';

import { ContactService } from './contact.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

const responseContactService = {email: 'diegoreymy@gmail.com', name: 'Diego', message: 'mensaje de prueba'};
const requestContactService = {email: 'diegoreymy@gmail.com', name: 'Diego', message: 'mensaje de prueba'};


describe('ContactService', () => {
  let injector: TestBed;
  let service: ContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [ContactService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});

    injector = getTestBed();
    service = injector.inject(ContactService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sendEmail', () => {
    service.sendEmail(requestContactService).subscribe((res) => {
      expect(res).toEqual(responseContactService);
    });
    const req = httpMock.expectOne('https://espanholentreamigos.com.br/assets/mail/email.php');
    expect(req.request.method).toBe('POST');
    req.flush(responseContactService);
  });
});
