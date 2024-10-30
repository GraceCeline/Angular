import { Component } from '@angular/core';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { WorkshopsService } from '../workshops.service';
import { RouterModule } from '@angular/router';
import { Router } from 'express';
import { NgFor, NgIf } from '@angular/common';
import { Workshop } from './workshops.model';

@Component({
  selector: 'app-workshops',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf,],
  templateUrl: './workshops.component.html',
  styleUrl: './workshops.component.css'
})
export class WorkshopsComponent {

  workshops: Workshop[] = [];
  
  checkWorkshop(): void {
    this.workshopsService.getWorkshops().subscribe(
      (data: Workshop[]) => {
        this.workshops = data;
        console.log(this.workshops); // Logs the array of workshops
      },
      (error) => {
        console.error('Error fetching workshops', error);
      }
    );
  }

  constructor(private workshopsService: WorkshopsService) { }

  /*retrieveWorkshops() {
    this.workshopsService.getWorkshops().subscribe(data => {
      console.log(data);
      this.workshops = data;
    }, error => {
      console.error("Error retrieving workshops", error);
    });
  }*/

  title = "Workshop"

  testFunction(i: number) {
    return (i + 1) % 3 === 0 && i + 1 !== this.workshops.length;
  }
}
