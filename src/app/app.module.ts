import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './user-module/login/login.component';
import { SignupComponent } from './user-module/signup/signup.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from './environments/environment';
import { BusesService } from './services/buses.service';
import { SeatComponent } from './user-module/seat/seat.component';

import { SeatSelectionComponent } from './user-module/seat-selection/seat-selection.component';
import { BookingComponent } from './user-module/booking/booking.component';
import { HomeComponent } from './home/home.component';

// import { AdminComponent } from './admin-module/admin/admin.component';
// import { AdminDetailsComponent } from './admin-module/admin-details/admin-details.component';
import { AuthService } from './shared/auth.service';
import { AuthguardService } from './shared/authguard.service';
import { FormComponent } from './user-module/form/form.component';
import { AdminauthguardService } from './shared/adminauthguard.service';
import { AdminRoutingModule } from './admin-module/admin-routing';

import { UserRoutingModule } from './user-module/user-routing';
import { AdminModuleModule } from './admin-module/admin-module.module';
const appRoutes: Routes = [
  // { path: '', component: HomeComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'login/signup', component: SignupComponent },
  // {
  //   path: 'seat/:Bus_No',
  //   component: SeatComponent,
  //   canActivate: [AuthguardService],
  // },
  // { path: 'login/signup/login', component: LoginComponent },
  // { path: 'seat', component: SeatComponent, canActivate: [AuthguardService] },
  // {
  //   path: 'book',
  //   component: BookingComponent,
  //   canActivate: [AuthguardService],
  // },
  // {
  //   path: 'buses',
  //   component: SeatSelectionComponent,
  //   canActivate: [AuthguardService],
  // },
  { path: 'home', component: HomeComponent },

  // { path: 'admin', component: AdminComponent },
  // {
  //   path: 'admindetails',
  //   component: AdminDetailsComponent,
  //   canActivate: [AdminauthguardService],
  // },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin-module/admin-module.module').then(
        (m) => m.AdminModuleModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./user-module/user-module.module').then(
        (m) => m.UserModuleModule
      ),
  },
  // { path: 'form', component: FormComponent, canActivate: [AuthguardService] },
];

@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    // SignupComponent,
    // SeatComponent,
    // SeatSelectionComponent,
    // BookingComponent,
    HomeComponent,

    // AdminComponent,
    // AdminDetailsComponent,
    // FormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
    AdminRoutingModule,
    UserRoutingModule,
  ],
  providers: [BusesService, AuthService],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
