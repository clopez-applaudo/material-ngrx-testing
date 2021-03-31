import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  it('should not change todo list if request fails', () => {
    component.toDoList = mockList;
    component.updateToDo(1, false);

    const httpRequest = http.expectOne(`${environment.baseUrl}/todos/1`);
    expect(httpRequest.request.method).toBe('PUT');
    httpRequest.error(new ErrorEvent('Nop'));

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
