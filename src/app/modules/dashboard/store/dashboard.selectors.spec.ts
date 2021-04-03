import { initialState } from 'src/app/test/store-initial-state';
import { listError, toDoList } from './dashboard.selectors';

describe('Selectors', () => {
  it('should select the list of todos', () => {
    const result = toDoList.projector(initialState.dashboard);
    expect(result.length).toEqual(2);
    expect(result[1].id).toBe(2);
    expect(result[1].title).toBe('Test 2');
    expect(result[1].completed).toBeFalse();
    expect(result[1].userId).toBe(1);
  });

  it('should select the error for list', () => {
    const result = listError.projector(initialState.dashboard);
    expect(result).toBe('Mock error');
  });
});
