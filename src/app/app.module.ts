import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from './environments/environment';
import { BusesService } from './services/buses.service';
import { SeatComponent } from './seat/seat.component';

import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import { BookingComponent } from './booking/booking.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { AuthService } from './shared/auth.service';
import { AuthguardService } from './authguard.service';
import { FormComponent } from './form/form.component';
import { AdminauthguardService } from './adminauthguard.service';





const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/signup', component: SignupComponent },
  { path: 'seat/:Bus_No', component: SeatComponent,canActivate: [AuthguardService]},
  { path: 'login/signup/login', component: LoginComponent },
  { path: 'seat', component: SeatComponent,canActivate: [AuthguardService] },
  { path: 'book', component: BookingComponent ,canActivate: [AuthguardService]},
  { path: 'buses', component: SeatSelectionComponent,canActivate: [AuthguardService] },
  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'home/contact', component: ContactComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admindetails', component: AdminDetailsComponent,canActivate:[AdminauthguardService] },
  {path:'form',component:FormComponent,canActivate: [AuthguardService]}
  
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,

    SeatComponent,

    SeatSelectionComponent,
    BookingComponent,
    HomeComponent,
    ContactComponent,
    AdminComponent,
    AdminDetailsComponent,
    FormComponent,
   

  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
  ],
  providers: [BusesService,AuthService],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
