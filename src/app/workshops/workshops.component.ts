import { Component, inject, OnInit } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
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
  styleUrl: './workshops.component.css',
  providers: [ WorkshopsService, ]
})
export class WorkshopsComponent implements OnInit{
 
  title = "Workshop"

  searchQuery: string = '';
  workshops: Workshop[] = [];
  filteredWorkshop : Workshop [] = [];

  constructor (private workshopsService : WorkshopsService) {}

  ngOnInit(): void {
    
  }

  getWorkshops() {
    this.workshopsService.getWorkshops().subscribe((data => {
      this.workshops = data;
    }))

    
  }

  chunkedWorkshops(array: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  testFunction(i: number) {
    return (i + 1) % 3 === 0 && i + 1 !== this.workshops.length;
  }

  

}
