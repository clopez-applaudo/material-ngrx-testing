import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardService } from './services/dashboard.service';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StoreModule } from '@ngrx/store';
import {
  dashboardFeatureKey,
  dashboardReducers,
} from './store/dashboard.reducers';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './store/dashboard.effects';

@NgModule({
  declarations: [DashboardLayoutComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatListModule,
    MatCheckboxModule,
    StoreModule.forFeature(dashboardFeatureKey, dashboardReducers),
    EffectsModule.forFeature([DashboardEffects]),
  ],
  providers: [DashboardService],
})
export class DashboardModule {}
