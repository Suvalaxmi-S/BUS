import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from '../shared/authguard.service';
import { SeatComponent } from './seat/seat.component';
import { BookingComponent } from './booking/booking.component';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import { FormComponent } from './form/form.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'seat', component: SeatComponent, canActivate: [AuthguardService] },
  {
    path: 'book',
    component: BookingComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'buses',
    component: SeatSelectionComponent,
    canActivate: [AuthguardService],
  },
  { path: 'form', component: FormComponent, canActivate: [AuthguardService] },
  { path: 'login', component: LoginComponent },
  { path: 'login/signup', component: SignupComponent },
  {
    path: 'seat/:Bus_No',
    component: SeatComponent,
    canActivate: [AuthguardService],
  },
  { path: 'login/signup/login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
