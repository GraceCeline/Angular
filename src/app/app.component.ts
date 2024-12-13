import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkshopsComponent } from './workshops/workshops.component';
import { CreateWorkshopComponent } from './create-workshop/create-workshop.component';
import { DetailWorkshopComponent } from './detail-workshop/detail-workshop.component';
import { WorkshopCardComponent } from './workshop-card/workshop-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WorkshopsComponent, CreateWorkshopComponent, DetailWorkshopComponent, WorkshopCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'workshop-angular';
}