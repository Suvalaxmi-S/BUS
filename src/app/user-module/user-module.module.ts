import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing';
import { FormComponent } from './form/form.component';
import { SeatComponent } from './seat/seat.component';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BookingComponent } from './booking/booking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FormComponent,
    SeatComponent,
    SeatSelectionComponent,
    LoginComponent,
    SignupComponent,
    BookingComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],
})
export class UserModuleModule {}
