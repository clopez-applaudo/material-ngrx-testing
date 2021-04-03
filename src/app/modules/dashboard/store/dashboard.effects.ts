import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
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
          map((response) =>
            dashboardActions.getToDoListSuccess({ list: response })
          ),
          catchError((error: HttpErrorResponse) =>
            of(dashboardActions.getToDoListFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateToDo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(dashboardActions.updateToDo),
      switchMap((action) =>
        this.service.updateTodo(action.id, action.completed).pipe(
          map((response) =>
            dashboardActions.updateToDoSuccess({ toDo: response })
          ),
          catchError((error: HttpErrorResponse) =>
            of(dashboardActions.updateToDoFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private service: DashboardService) {}
}
