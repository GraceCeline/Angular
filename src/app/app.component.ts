import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkshopsComponent } from './workshops/workshops.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WorkshopsComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'workshop-angular';
}
