import { Routes } from '@angular/router';
import { CreateWorkshopComponent } from './create-workshop/create-workshop.component';
import { WorkshopsComponent } from './workshops/workshops.component';
import { DetailWorkshopComponent } from './detail-workshop/detail-workshop.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: WorkshopsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component : RegisterComponent},
    { path: 'create', component: CreateWorkshopComponent, canActivate: [AuthGuard]},
    { path: 'workshop/:id', component: DetailWorkshopComponent },
    { path: 'workshop/:id/edit', component: CreateWorkshopComponent,  canActivate: [AuthGuard] },
];
 