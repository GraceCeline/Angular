import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, Subject, tap, throwError } from 'rxjs';
import { Workshop } from './workshops/workshops.model';
import { Tool } from './workshops/tool.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgFor } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { SuccessModalComponent } from './success-modal/success-modal.component';

@Injectable({
  providedIn: 'root'
})
export class WorkshopsService {
  listUrl = 'http://localhost:8000/workshop/';
  createUrl = 'http://localhost:8000/workshop/create/';
  toolUrl = 'http://localhost:8000/workshop/tools/';
  token = "6a4dba40365ded0dd5bf34e124d2caa4cda79bd1";
  baseUrl = 'http://localhost:8000/workshop/';

  constructor(private http: HttpClient, private modalService : NgbModal) { }

  getTools(): Observable<any> {
    return this.http.get<Tool[]>(this.toolUrl);
  }

  getWorkshops(query : string): Observable<any> {
    let params = new HttpParams();;
    params = params.set('search', query);
    return this.http.get<any>(`${this.listUrl}`, { params });

  }

  getWorkshopsByUrl(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
  

  getDetailWorkshop(id : number) : Observable<Workshop> {
    return this.http.get<Workshop>(`${this.listUrl}${id}/`);
  }

  createWorkshop(workshop :Workshop) : Observable<HttpResponse<any>>{
    
    return this.http.post<Workshop>(this.createUrl, workshop, { observe: 'response' });
  }

  updateWorkshop(id: number, workshop: Workshop): Observable<any> {
    console.log('Data being sent:', workshop);
    return this.http.patch(`${this.baseUrl}${id}/edit/`, workshop, { observe: 'response' });
  }

  deleteWorkshop(id : number) : Observable<any> {
    return this.http.delete<void>(`${this.baseUrl}${id}/delete/`, { observe: 'response' }).pipe(
      tap(() => console.log(`Workshop with ID ${id} deleted successfully`)),
      catchError(this.handleError)
    );
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
          errorMessages.push(`${key}: ${value}`);
        }
      } else {
        errorMessages.push(`${error}`);
      }
    }
    console.log('Error messages:', errorMessages);
    this.openErrorModal(errorMessages);
    throwError(errorMessages);
    
    return errorMessages;
  }

  openModal(statusCode: number, statusMessage: string) {
    const modalRef = this.modalService.open(SuccessModalComponent);
    modalRef.componentInstance.statusCode = statusCode;
    modalRef.componentInstance.message = statusMessage;
  }

  openErrorModal(errorMessages: string[]) {
    const errorModal = this.modalService.open(ModalComponent, {centered : true, size : "lg"});
    errorModal.componentInstance.errorMessages = errorMessages;
  }

  private workshopDeletedSource = new Subject<number>(); // Subject to emit deleted workshop ID
  workshopDeleted$ = this.workshopDeletedSource.asObservable();
  // Notify the workshop list component when a workshop is deleted
  notifyWorkshopDeleted(id: number) {
    this.workshopDeletedSource.next(id);
  }
}
