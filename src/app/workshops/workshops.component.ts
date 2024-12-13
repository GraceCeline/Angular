import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { WorkshopsService } from '../workshops.service';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Workshop } from './workshops.model';
import { FormsModule } from '@angular/forms';
import { WorkshopCardComponent } from '../workshop-card/workshop-card.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workshops',
  standalone: true,
  imports: [RouterModule, NgFor, NgIf, FormsModule, WorkshopCardComponent],
  templateUrl: './workshops.component.html',
  styleUrl: './workshops.component.css',
  providers: [WorkshopsService,]
})
export class WorkshopsComponent implements OnInit {

  title = "Workshop"

  searchQuery: string = '';
  filteredWorkshops: Workshop[] = [];
  pages: number = 1;
  previousPage!: string;
  nextPage!: string;
  currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  private workshopDeletedSubscription: Subscription;

  constructor(private workshopsService: WorkshopsService) { }

  ngOnInit(): void {

    this.workshopDeletedSubscription = this.workshopsService.workshopDeleted$.subscribe(
      (deletedWorkshopId: number) => {
        this.removeWorkshopFromList(deletedWorkshopId); // Remove the deleted workshop from the list
      }
    );

  }

  ngOnDestroy() {
    if (this.workshopDeletedSubscription) {
      this.workshopDeletedSubscription.unsubscribe();  // Clean up subscription when component is destroyed
    }
  }

  getWorkshops() {
    const query = this.searchQuery.trim();
    this.workshopsService.getWorkshops(query).subscribe(data => {
        console.log(data);
        this.filteredWorkshops = data.results;
        console.log(this.filteredWorkshops.length);
        this.pages = Math.ceil(data.count / 6);
        this.previousPage = data.previous;
        this.nextPage = data.next;
        console.log(this.pages);
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

  goToNext() {
    this.currentPage++;
    this.workshopsService.getWorkshopsByUrl(this.nextPage).subscribe(
      (data) => {
        this.filteredWorkshops = data.results;
        this.previousPage = data.previous;
        this.nextPage = data.next;
      },
      (error) => {
        console.error('Error fetching workshops:', error);
      }
    );
  }

  goToPrevious() {
    this.currentPage--;
    this.workshopsService.getWorkshopsByUrl(this.previousPage).subscribe(
      (data) => {
        this.filteredWorkshops = data.results;
        this.previousPage = data.previous;
        this.nextPage = data.next;
      },
      (error) => {
        console.error('Error fetching workshops:', error);
      }
    );
  }

  removeWorkshopFromList(id: number) {
    this.filteredWorkshops = this.filteredWorkshops.filter(workshop => workshop.id !== id);
  }

}
