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

  workshops: Workshop[] = [];

  constructor (private workshopsService : WorkshopsService) {}

  ngOnInit(): void {
    
  }

  getWorkshops() {
    this.workshopsService.getWorkshops().subscribe((data => {
      this.workshops = data;
    }))
  }

  testFunction(i: number) {
    return (i + 1) % 3 === 0 && i + 1 !== this.workshops.length;
  }
}
