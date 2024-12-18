import { Routes } from '@angular/router';
import { CreateWorkshopComponent } from './create-workshop/create-workshop.component';
import { WorkshopsComponent } from './workshops/workshops.component';
import { DetailWorkshopComponent } from './detail-workshop/detail-workshop.component';

export const routes: Routes = [
    { path: '', component: WorkshopsComponent },
    { path: 'create', component: CreateWorkshopComponent },
    { path: 'workshop/:id', component: DetailWorkshopComponent }
];
 