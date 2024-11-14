import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Workshop } from './workshops/workshops.model';
import { Tool } from './workshops/tool.model';

@Injectable({
  providedIn: 'root'
})
export class WorkshopsService {
  listUrl = 'http://localhost:8000/workshop/';
  createUrl = 'http://localhost:8000/workshop/create/';
  toolUrl = 'http://localhost:8000/workshop/tools/';
  token = "6a4dba40365ded0dd5bf34e124d2caa4cda79bd1";

  constructor(private http: HttpClient) { }

  getTools(): Observable<Tool[]> {
    return this.http.get<Tool[]>(this.toolUrl);
  }

  getWorkshops(): Observable<Workshop[]> {
    return this.http.get<Workshop[]>(this.listUrl);
  }

  getDetailWorkshop(id : number) : Observable<Workshop> {
    return this.http.get<Workshop>(`${this.listUrl}${id}/`);
  }

  createWorkshop(workshop :Workshop) : Observable<Workshop>{
    
    return this.http.post<Workshop>(this.createUrl, workshop);
  }
}
