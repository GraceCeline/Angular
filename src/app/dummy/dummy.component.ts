import { Component, OnInit } from '@angular/core';
import { WorkshopsService } from '../workshops.service';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SuccessModalComponent } from '../success-modal/success-modal.component';

@Component({
  selector: 'app-dummy',
  standalone: true,
  imports: [RouterModule, CommonModule, SuccessModalComponent],
  templateUrl: './dummy.component.html',
  styleUrl: './dummy.component.css',
  providers : [WorkshopsService,]
})
export class DummyComponent implements OnInit{
  constructor(private workshopsService: WorkshopsService, private router : Router) { }

  ngOnInit() {
    this.fetchDummy();
  }

  fetchDummy() : void {
    this.workshopsService.goToDummy().subscribe(
      (response: any) => {
        this.workshopsService.openModal(response.status, response.message);
      },
      (error) => {
        this.workshopsService.openModal(error.status, error.message);
      }
    );
  }
}
