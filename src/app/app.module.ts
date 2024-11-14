import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkshopsComponent } from './workshops/workshops.component'; // Your custom component 
import { CreateWorkshopComponent } from './create-workshop/create-workshop.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,  // <-- Ensure AppComponent is declared here
    WorkshopsComponent, // Your custom component
    CreateWorkshopComponent,
  ],
  imports: [
    BrowserModule,
    WorkshopsComponent,
    CommonModule,
    CreateWorkshopComponent,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent]  // <-- Bootstraps the root component
})
export class AppModule { }
