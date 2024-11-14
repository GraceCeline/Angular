import { Component, OnInit } from '@angular/core';
import { Workshop } from '../workshops/workshops.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WorkshopsService } from '../workshops.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-detail-workshop',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './detail-workshop.component.html',
  styleUrl: './detail-workshop.component.css',
  providers : [WorkshopsService, ]
})
export class DetailWorkshopComponent implements OnInit{

  workshop : Workshop | undefined;
  
  constructor(private route: ActivatedRoute, private workshopsService : WorkshopsService) {}

  ngOnInit(): void {
    const workshop_id = +this.route.snapshot.paramMap.get('id')!;

    this.workshopsService.getDetailWorkshop(workshop_id).subscribe(
      (data) => this.workshop = data,
      error => console.error('Error fetching workshop:', error)
    );
  }

}
