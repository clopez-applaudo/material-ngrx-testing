import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { DashboardService } from '../services/dashboard.service';
import { DashboardEffects } from './dashboard.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { of, throwError } from 'rxjs';
import {
  getToDoList,
  getToDoListFailure,
  getToDoListSuccess,
  updateToDo,
  updateToDoFailure,
  updateToDoSuccess,
} from './dashboard.actions';
import { mockList } from 'src/app/test/mock/mock-todo-list';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

describe('Dashboard Effects', () => {
  let actions$: Actions;
  let effects: DashboardEffects;
  let service: DashboardService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          DashboardEffects,
          provideMockActions(() => actions$),
          DashboardService,
        ],
      });

      effects = TestBed.inject(DashboardEffects);
      service = TestBed.inject(DashboardService);
    })
  );

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should trigger dispath success action when request success', () => {
    actions$ = of(getToDoList());

    spyOn(service, 'getTodos').and.returnValue(of(mockList));

    effects.loadToDoList$.pipe(take(1)).subscribe((action: any) => {
      expect(service.getTodos).toHaveBeenCalledTimes(1);

      expect(action).toEqual(getToDoListSuccess({ list: mockList }));
    });
  });

  it('should trigger dispath failure action when request fails', () => {
    actions$ = of(getToDoList());

    spyOn(service, 'getTodos').and.returnValue(
      throwError(
        new HttpErrorResponse({
          error: 'This is an error',
          statusText: 'Not found',
          status: 404,
          url: 'test.com',
        })
      )
    );

    effects.loadToDoList$.pipe(take(1)).subscribe((action: any) => {
      expect(service.getTodos).toHaveBeenCalledTimes(1);

      expect(action).toEqual(
        getToDoListFailure({
          error: 'Http failure response for test.com: 404 Not found',
        })
      );
    });
  });

  it('should trigger dispath success action when request success', () => {
    actions$ = of(updateToDo({ completed: true, id: 1 }));
    const mockResponse = {
      completed: true,
      id: 1,
    };

    spyOn(service, 'updateTodo').and.returnValue(of(mockResponse));

    effects.updateToDo$.pipe(take(1)).subscribe((action: any) => {
      expect(service.updateTodo).toHaveBeenCalledTimes(1);

      expect(action).toEqual(updateToDoSuccess({ toDo: mockResponse }));
    });
  });

  it('should trigger dispath failure action when request fails', () => {
    actions$ = of(updateToDo({ completed: true, id: 1 }));

    spyOn(service, 'updateTodo').and.returnValue(
      throwError(
        new HttpErrorResponse({
          error: 'This is an error',
          statusText: 'Not found',
          status: 404,
          url: 'test.com',
        })
      )
    );

    effects.updateToDo$.pipe(take(1)).subscribe((action: any) => {
      expect(service.updateTodo).toHaveBeenCalledTimes(1);

      expect(action).toEqual(
        updateToDoFailure({
          error: 'Http failure response for test.com: 404 Not found',
        })
      );
    });
  });
});
