import { createAction, props } from '@ngrx/store';
import { ToDo } from '../models/todo.model';

export const getToDoList = createAction('[Dashboard] Get ToDo List');

export const getToDoListSuccess = createAction(
  '[Dashboad] Get ToDo List Success',
  props<{
    list: ToDo[];
  }>()
);

export const getToDoListFailure = createAction(
  '[Dashboard] Get ToDo List Failure',
  props<{ error: string }>()
);

export const updateToDo = createAction(
  '[Dashboard] Update ToDo',
  props<{
    completed: boolean;
  }>()
);

export const updateToDoSuccess = createAction(
  '[Dashboard] Update ToDo Success',
  props<{
    ToDo: Partial<ToDo>;
  }>()
);

export const updateToDoFailure = createAction(
  '[Dashboard] Update ToDo Failure',
  props<{
    error: string;
  }>()
);
