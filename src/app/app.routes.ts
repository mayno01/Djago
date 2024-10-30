import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HotelListComponent } from './components/hotel-list/hotel-list.component';
import { HotelDetailComponent } from './components/hotel-detail/hotel-detail.component';
import { AddHotelComponent } from './components/add-hotel/add-hotel.component';
import { EditHotelComponent } from './components/edit-hotel/edit-hotel.component';
import { CheckinComponent } from './components/checkin/checkin.component'; 
import { CircuitListComponent } from './components/circuit-list/circuit-list.component';
import {AddCircuitComponent} from './components/add-circuit/add-circuit.component';
import { EditCircuitComponent } from './edit-circuit/edit-circuit.component';
import { RecommendationComponent } from './components/recommendation/recommendation.component'; 
import { CircuitDetailComponent } from './circuit-detail/circuit-detail.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'circuits', component: CircuitListComponent},
  { path: 'add-circuit', component: AddCircuitComponent },
  { path: 'circuits/edit/:id', component: EditCircuitComponent },
  { path: 'recommendations', component: RecommendationComponent },
  { path: 'circuits/:id', component: CircuitDetailComponent },


  { path: 'register', component: RegisterComponent },
  { path : 'home', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'reset-password/:uidb64/:token', component: ResetPasswordComponent },
  { path: 'hotels', component: HotelListComponent },
  { path: 'hotels/:id', component: HotelDetailComponent}, // Route for hotel detail
  { path: 'add-hotel', component: AddHotelComponent}, // Add this line
  { path: 'edit-hotel/:id', component: EditHotelComponent },
  { path: 'checkin', component: CheckinComponent },

  { path: '**', redirectTo: 'forget-password' },
  
];

export const AppConfig = [
  provideRouter(routes),
];
