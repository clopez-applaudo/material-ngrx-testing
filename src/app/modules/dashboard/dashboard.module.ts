import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardService } from './services/dashboard.service';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [DashboardLayoutComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatListModule,
    MatCheckboxModule,
  ],
  providers: [DashboardService],
})
export class DashboardModule {}
