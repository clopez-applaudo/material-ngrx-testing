import { mockList } from 'src/app/test/mock/mock-todo-list';
import { initialState } from 'src/app/test/store-initial-state';
import {
  getToDoListFailure,
  getToDoListSuccess,
  updateToDoFailure,
  updateToDoSuccess,
} from './dashboard.actions';
import { dashboardReducers, DashboardState } from './dashboard.reducers';

describe('Dashboard reducers', () => {
  it('should return the default state with unknown action', () => {
    const action = { type: 'Unknown' };
    const state = dashboardReducers(initialState.dashboard, action);

    expect(state).toBe(initialState.dashboard);
  });

  it('should update list with getToDoSuccess', () => {
    const action = getToDoListSuccess({ list: mockList });
    const state = dashboardReducers(initialState.dashboard, action);
    const newState: DashboardState = {
      list: mockList,
      error: undefined,
    };

    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });

  it('should not update list and set errorwith getToDoFailure', () => {
    const action = getToDoListFailure({ error: 'This is an error' });
    const state = dashboardReducers(initialState.dashboard, action);
    const newState: DashboardState = {
      list: initialState.dashboard.list,
      error: 'This is an error',
    };

    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });

  it('should update an element from the list with updateToDoSuccess, also clean the error state', () => {
    const action = updateToDoSuccess({ toDo: { completed: false, id: 1 } });
    const state = dashboardReducers(initialState.dashboard, action);
    const newState: DashboardState = {
      ...initialState.dashboard,
      list: [
        ...initialState.dashboard.list.map((todo) =>
          todo.id === 1 ? { ...todo, completed: false } : todo
        ),
      ],
      error: undefined,
    };

    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });

  it('should not update an element from the list with updateToDoSuccess and add error', () => {
    const action = updateToDoFailure({ error: 'This is another error' });
    const state = dashboardReducers(initialState.dashboard, action);
    const newState: DashboardState = {
      ...initialState.dashboard,
      error: 'This is another error',
    };

    expect(state).toEqual(newState);
    expect(state).not.toBe(newState);
  });
});
