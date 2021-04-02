import { ActionReducerMap } from '@ngrx/store';
import {
  dashboardReducers,
  DashboardState,
} from '../../dashboard/store/dashboard.reducers';

export interface AppState {
  dashboard: DashboardState;
}

export const reducers: ActionReducerMap<AppState> = {
  dashboard: dashboardReducers,
};
