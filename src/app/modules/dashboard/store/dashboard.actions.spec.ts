import { getToDoList, getToDoListSuccess } from './dashboard.actions';

describe('dashboard actions', () => {
  it('should create getTodoList', () => {
    const action = getToDoList();

    expect(action.type).toEqual('[Dashboard] Get ToDo List');
  });

  it('should create todo list success action', () => {
    const mockList = [
      {
        completed: false,
        id: 1,
        title: 'test',
        userId: 1,
      },
    ];
    const action = getToDoListSuccess({ list: mockList });

    expect(action.type).toEqual('[Dashboad] Get ToDo List Success');
    expect(action.list).toEqual(mockList);
  });
});
