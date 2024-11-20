import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Workshop } from './workshops/workshops.model';
import { Tool } from './workshops/tool.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';
import { ModalComponent } from './modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class WorkshopsService {
  listUrl = 'http://localhost:8000/workshop/';
  createUrl = 'http://localhost:8000/workshop/create/';
  toolUrl = 'http://localhost:8000/workshop/tools/';
  token = "6a4dba40365ded0dd5bf34e124d2caa4cda79bd1";

  constructor(private http: HttpClient, private modal : NgbModal) { }

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

  handleError(error: HttpErrorResponse) {
    let errorMessages: string[] = [];
    
    if (error.error instanceof ErrorEvent) {
      errorMessages.push(`Client Error: ${error.error.message}`);
    } else {
      errorMessages.push(`Error Code: ${error.status}`);
      if (error.error && typeof error.error === 'object') {
        // If the error contains multiple messages, add each one to the array
        for (const [key, value] of Object.entries(error.error)) {
          errorMessages.push(`${value}`);
        }
      } else {
        errorMessages.push(`${error.message}`);
      }
    }
    console.log('Error messages:', errorMessages);
    this.openErrorModal(errorMessages);
    throwError(errorMessages);
    
    return errorMessages;
  }

  openErrorModal(errorMessages: string[]) {
    const modal = this.modal.open(ModalComponent, {centered : true, size : "lg"});
    modal.componentInstance.errorMessages = errorMessages;
  }

}
