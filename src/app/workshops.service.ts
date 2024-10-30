import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class WorkshopsService {
  apiUrl = 'http://localhost:8000/workshop/';
  token = "6a4dba40365ded0dd5bf34e124d2caa4cda79bd1";

  constructor(private http: HttpClient) { }

  getWorkshops(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
