import { AppState } from '../modules/core/store/app.store';

export const initialState: AppState = {
  dashboard: {
    list: [
      {
        completed: true,
        id: 1,
        title: 'Test',
        userId: 1,
      },
      {
        completed: false,
        id: 2,
        title: 'Test 2',
        userId: 1,
      },
    ],
    error: 'Mock error',
  },
};
