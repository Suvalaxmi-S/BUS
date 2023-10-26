import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import the RouterModule and AdminRoutingModule
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing';

// Import your components (AdminComponent and AdminDetailsComponent)
import { AdminComponent } from './admin/admin.component';
import { AdminDetailsComponent } from '../admin-module/admin-details/admin-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [AdminComponent, AdminDetailsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
})
export class AdminModuleModule {}
