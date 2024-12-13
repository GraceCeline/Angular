import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WorkshopsService } from '../workshops.service';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { routes } from '../app.routes';

@Component({
  selector: 'app-delete-workshop',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './delete-workshop.component.html',
  styleUrl: './delete-workshop.component.css',
  providers : [WorkshopsService, ]
})
export class DeleteWorkshopComponent {
  workshop_id : number;
  constructor(private route: ActivatedRoute, public deleteModal: NgbActiveModal, private workshopService : WorkshopsService) {}

  deleteWorkshop(){
    this.workshopService.deleteWorkshop(this.workshop_id).subscribe((response) => {
      this.workshopService.notifyWorkshopDeleted(this.workshop_id);
      console.log('Workshop deleted successfully:', response, this.workshop_id);
  });
    this.deleteModal.close('Workshop deleted');
    this.workshopService.openModal(204,`Deleting workshop with ID: ${this.workshop_id}`);
  }
}
