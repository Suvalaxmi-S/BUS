import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminDetailsComponent } from '../admin-module/admin-details/admin-details.component';
import { AdminauthguardService } from '../shared/adminauthguard.service';
const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  {
    path: 'admindetails',
    component: AdminDetailsComponent,
    canActivate: [AdminauthguardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
