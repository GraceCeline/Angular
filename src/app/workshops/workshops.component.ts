import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { WorkshopsService } from '../workshops.service';
import { RouterModule } from '@angular/router';
import { Router } from 'express';
import { NgFor, NgIf } from '@angular/common';
import { Workshop } from './workshops.model';
import { FormsModule } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

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
  filteredWorkshops: Workshop[] = [];
  pages : number = 1;
  previousPage!: string;
  nextPage!: string;
  currentPage : number = 1;
  @Output() pageChange = new EventEmitter<PageEvent>();

  constructor (private workshopsService : WorkshopsService) {}

  ngOnInit(): void {
    
  }

  getWorkshops() {
    const query = this.searchQuery.trim();
    this.workshopsService.getWorkshops(query).subscribe(
      (data) => {
        console.log(data);
        this.filteredWorkshops = data.results;
        console.log(this.filteredWorkshops.length);
        this.pages = Math.ceil(data.count / 6);
        this.previousPage = data.previous;
        this.nextPage = data.next;
        console.log(this.pages);
      },
      (error) => {
        console.error('Error fetching workshops:', error);
      }
    );
  }


  chunkedWorkshops(array: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.pages) {
      this.currentPage = page;
      this.getWorkshops();
    }
  }

  goToNext(url : string){
    this.currentPage++;
    this.workshopsService.getWorkshopsByUrl(this.nextPage).subscribe(
      (data) => {
        console.log(data);
        this.filteredWorkshops = data.results;
        console.log(this.filteredWorkshops.length);
        this.pages = Math.ceil(data.count / 6);
        this.previousPage = data.previous;
        this.nextPage = data.next;
        console.log(this.pages);
      },
      (error) => {
        console.error('Error fetching workshops:', error);
      }
    );
  }

  goToPrevious(url : string){
    this.currentPage--;
    this.workshopsService.getWorkshopsByUrl(this.previousPage).subscribe(
      (data) => {
        console.log(data);
        this.filteredWorkshops = data.results;
        console.log(this.filteredWorkshops.length);
        this.pages = Math.ceil(data.count / 6);
        this.previousPage = data.previous;
        this.nextPage = data.next;
        console.log(this.pages);
      },
      (error) => {
        console.error('Error fetching workshops:', error);
      }
    );
  }

}
