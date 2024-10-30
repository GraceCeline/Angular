import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WorkshopsComponent } from './workshops/workshops.component'; // Your custom component
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,  // <-- Ensure AppComponent is declared here
    WorkshopsComponent // Your custom component
  ],
  imports: [
    BrowserModule,
    WorkshopsComponent,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]  // <-- Bootstraps the root component
})
export class AppModule { }
