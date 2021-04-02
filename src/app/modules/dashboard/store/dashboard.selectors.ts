import { createSelector } from '@ngrx/store';
import { AppState } from '../../core/store/app.store';

export const getDashboardState = (state: AppState) => state.dashboard;

export const toDoList = createSelector(
  getDashboardState,
  (state) => state.list
);

export const listError = createSelector(
  getDashboardState,
  (state) => state.error
);
