import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IEmail } from '../models/iEmail.model';

export interface IEmailData {
  name: string;
  _replyto: string;
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private urlEmailApi = 'https://formspree.io/f/xeqvpgqj';

  constructor(private http: HttpClient) { }

  public sendEmail(data: IEmailData): Observable<any> {
    return this.http.post(this.urlEmailApi, data);
  }
}

