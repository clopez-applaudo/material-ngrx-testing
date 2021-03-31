import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment.test';
import { DashboardService } from '../../services/dashboard.service';

import { DashboardLayoutComponent } from './dashboard-layout.component';

const mockList = [
  {
    completed: false,
    id: 1,
    title: 'Test',
    userId: 1,
  },
  {
    completed: true,
    id: 2,
    title: 'Second Test',
    userId: 1,
  },
];

describe('DashboardLayoutComponent', () => {
  let component: DashboardLayoutComponent;
  let fixture: ComponentFixture<DashboardLayoutComponent>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardLayoutComponent],
      imports: [HttpClientTestingModule],
      providers: [DashboardService],
    }).compileComponents();

    http = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    http.match(() => true).forEach((request) => request.flush([]));
    http.verify();
  });

  it('should retrieve list of todo onInit', () => {
    const httpRequest = http.expectOne(`${environment.baseUrl}/todos?userId=1`);
    expect(httpRequest.request.method).toBe('GET');
    httpRequest.flush([]);
  });

  it('should not change todo list if request fails', () => {
    component.toDoList = mockList;
    component.updateToDo(1, false);

    const httpRequest = http.expectOne(`${environment.baseUrl}/todos/1`);
    expect(httpRequest.request.method).toBe('PUT');
    httpRequest.flush(throwError('Error'));

    expect(component.toDoList).toEqual(mockList);
  });

  it('should change todo list if request is success', () => {
    component.toDoList = mockList;
    component.updateToDo(1, false);

    const httpRequest = http.expectOne(`${environment.baseUrl}/todos/1`);
    expect(httpRequest.request.method).toBe('PUT');
    httpRequest.flush({
      completed: true,
      id: 1,
    });

    const newList = [...mockList];
    newList[0].completed = true;

    expect(component.toDoList).toEqual(newList);
  });
});
