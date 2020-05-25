import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IEmail } from '../models/iEmail.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private urlEmailApi = 'https://espanholentreamigos.com.br/assets/mail/email.php';

  constructor(private http: HttpClient) { }

  public sendEmail(data: IEmail): Observable<IEmail> {
    return this.http.post<IEmail>(this.urlEmailApi, data);
  }
}

