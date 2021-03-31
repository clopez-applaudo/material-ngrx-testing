import { TestBed } from '@angular/core/testing';

import { DashboardService } from './dashboard.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment.test';
import { ToDo } from '../models/todo.model';

fdescribe('DashboardService', () => {
  let service: DashboardService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DashboardService],
    });

    service = TestBed.inject(DashboardService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get todo list from API', () => {
    const mockResponse: ToDo[] = [
      {
        completed: false,
        id: 1,
        title: 'Test todo',
        userId: 2,
      },
    ];
    const userId = 2;
    service
      .getTodos(userId)
      .subscribe((res) =>
        expect(res).toEqual([
          ...mockResponse.map((entry) => ({ ...entry, parentId: 1 })),
        ])
      );

    const request = http.expectOne(
      `${environment.baseUrl}/todos?userId=${userId}`
    );
    expect(request.request.method).toBe('GET');
    request.flush(mockResponse);
  });
});