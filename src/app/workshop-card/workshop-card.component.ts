import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Workshop } from '../workshops/workshops.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteWorkshopComponent } from '../delete-workshop/delete-workshop.component';

@Component({
  selector: 'app-workshop-card',
  standalone: true,
  imports: [RouterModule,],
  templateUrl: './workshop-card.component.html',
  styleUrl: './workshop-card.component.css'
})
export class WorkshopCardComponent {
  @Input() workshop: Workshop;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  ngOnInit() : void {}

  constructor(private modalService: NgbModal) {}

  openDeleteModal(id : number): void {
    const modalRef = this.modalService.open(DeleteWorkshopComponent);
    modalRef.componentInstance.workshop_id = id; // Pass workshop ID to the modal
  }

}
