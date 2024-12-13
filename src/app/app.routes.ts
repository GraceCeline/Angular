import { Routes } from '@angular/router';
import { CreateWorkshopComponent } from './create-workshop/create-workshop.component';
import { WorkshopsComponent } from './workshops/workshops.component';
import { DetailWorkshopComponent } from './detail-workshop/detail-workshop.component';
import { DeleteWorkshopComponent } from './delete-workshop/delete-workshop.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', component: WorkshopsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'create', component: CreateWorkshopComponent },
    { path: 'workshop/:id', component: DetailWorkshopComponent },
    { path: 'workshop/:id/edit', component: CreateWorkshopComponent },
    { path: 'workshop/:id/delete', component:DeleteWorkshopComponent },
];
 