import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { DashboardService } from '../services/dashboard.service';
import * as dashboardActions from './dashboard.actions';

@Injectable()
export class DashboardEffects {
  loadToDoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dashboardActions.getToDoList),
      switchMap(() =>
        this.service.getTodos().pipe(
          catchError((error: HttpErrorResponse) => {
            dashboardActions.getToDoListFailure({ error: error.message });
            return EMPTY;
          }),
          map((response) =>
            dashboardActions.getToDoListSuccess({ list: response })
          )
        )
      )
    )
  );

  updateToDo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dashboardActions.updateToDo),
      switchMap((action) =>
        this.service.udpateTodo(action.id, action.completed).pipe(
          catchError((error: HttpErrorResponse) => {
            dashboardActions.updateToDoFailure({ error: error.message });
            return EMPTY;
          }),
          map((response) =>
            dashboardActions.updateToDoSuccess({ toDo: response })
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private service: DashboardService) {}
}
