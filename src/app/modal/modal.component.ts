import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent  implements OnInit{
  @Input() errorMessages: string[] = []; // Array to hold multiple error messages

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    console.log(this.errorMessages)
  }
}
