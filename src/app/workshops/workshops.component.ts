import { Component, inject, OnInit } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { WorkshopsService } from '../workshops.service';
import { RouterModule } from '@angular/router';
import { Router } from 'express';
import { NgFor, NgIf } from '@angular/common';
import { Workshop } from './workshops.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workshops',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf, FormsModule,],
  templateUrl: './workshops.component.html',
  styleUrl: './workshops.component.css',
  providers: [ WorkshopsService, ]
})
export class WorkshopsComponent implements OnInit{
 
  title = "Workshop"

  searchQuery: string = '';
  workshops: Workshop[] = [];
  filteredWorkshops: Workshop[] = [];

  constructor (private workshopsService : WorkshopsService) {}

  ngOnInit(): void {
    
  }

  getWorkshops() {
    this.workshopsService.getWorkshops().subscribe((data => {
      this.workshops = data;
      this.filteredWorkshops = data;
      this.searchWorkshops();
    }))
  }

  searchWorkshops() {
    if (this.searchQuery) {
      this.filteredWorkshops = this.workshops.filter(workshop =>
        workshop.workshop_title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      // If searchQuery is empty, show all workshops
      this.filteredWorkshops = this.workshops;
    }
  }

  chunkedWorkshops(array: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }


}
