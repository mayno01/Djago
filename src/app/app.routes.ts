import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import {DestinationsComponent} from './destinations/destinations.component';
import {DestinationDetailsComponent} from './destination-details/destination-details.component';
import {AddDestinationComponent} from './add-destination/add-destination.component';
import {UpdateDestinationComponent} from './update-destination/update-destination.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path : 'home', component: HomeComponent },
  { path : 'destinations', component: DestinationsComponent},
  { path: 'destination/:id', component: DestinationDetailsComponent }, // Dynamic route for each destination
  { path: 'add-destination', component: AddDestinationComponent },
  { path: 'destinations/update/:id', component: UpdateDestinationComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

export const AppConfig = [
  provideRouter(routes),
];
