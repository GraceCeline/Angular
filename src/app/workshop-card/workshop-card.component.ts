import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Workshop } from '../workshops/workshops.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkshopsService } from '../workshops.service';
import { DeleteWorkshopComponent } from '../delete-workshop/delete-workshop.component';
import { WorkshopsComponent } from '../workshops/workshops.component';

@Component({
  selector: 'app-workshop-card',
  standalone: true,
  imports: [RouterModule,],
  templateUrl: './workshop-card.component.html',
  styleUrl: './workshop-card.component.css'
})
export class WorkshopCardComponent {
  @Input() workshop: Workshop;
  @ViewChild('deleteModal') deleteModal: any;
  @Output() workshopDeleted = new EventEmitter<number>();
  statusCode : number;

  ngOnInit() : void {}

  constructor(private modalService: NgbModal, private workshopService : WorkshopsService) {}

  openModal(): void {
    this.modalService.open(this.deleteModal);
  }

  deleteWorkshop(): void {
    this.workshopService.deleteWorkshop(this.workshop.id).subscribe((response) => {
      this.workshopService.notifyWorkshopDeleted(this.workshop.id);
      this.statusCode = response.status;
      this.workshopDeleted.emit(this.workshop.id);
      console.log('Workshop deleted successfully:', response, this.workshop.id);
  });
    this.deleteModal.close();
    this.workshopService.openModal(this.statusCode,`Deleting workshop with ID: ${this.workshop.id}`);

  }

}
