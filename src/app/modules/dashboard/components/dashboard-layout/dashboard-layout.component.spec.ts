import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment.test';
import { DashboardService } from '../../services/dashboard.service';

import { DashboardLayoutComponent } from './dashboard-layout.component';
import { MatListItemHarness } from '@angular/material/list/testing';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';

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
] as const;

describe('DashboardLayoutComponent', () => {
  let component: DashboardLayoutComponent;
  let fixture: ComponentFixture<DashboardLayoutComponent>;
  let http: HttpTestingController;
  let loader: HarnessLoader;
  let initialLoad: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardLayoutComponent],
      imports: [HttpClientTestingModule, MatListModule, MatCheckboxModule],
      providers: [DashboardService],
    }).compileComponents();

    http = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLayoutComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    initialLoad = spyOn(component, 'loadToDo');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    http.verify();
  });

  it('should retrieve list of todo onInit', () => {
    initialLoad.and.callThrough();
    component.ngOnInit();
    const httpRequest = http.expectOne(`${environment.baseUrl}/todos?userId=1`);
    expect(httpRequest.request.method).toBe('GET');
    httpRequest.flush([]);
  });

  it('should not change todo list if request fails', () => {
    component.toDoList = [...mockList];
    component.updateToDo(1, false);

    const httpRequest = http.expectOne(`${environment.baseUrl}/todos/1`);
    expect(httpRequest.request.method).toBe('PUT');
    httpRequest.flush(throwError('Error'));

    expect(component.toDoList).toEqual(mockList);
  });

  it('should change todo list if request is success', () => {
    component.toDoList = [...mockList];
    component.updateToDo(1, false);

    const httpRequest = http.expectOne(`${environment.baseUrl}/todos/1`);
    expect(httpRequest.request.method).toBe('PUT');
    httpRequest.flush({
      completed: true,
      id: 1,
    });

    const newList = [
      {
        completed: true,
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

    expect(component.toDoList).toEqual(newList);
  });

  it('should render the todo list when retrieved', async () => {
    initialLoad.and.callThrough();
    component.ngOnInit();
    const httpRequest = http.expectOne(`${environment.baseUrl}/todos?userId=1`);
    expect(httpRequest.request.method).toBe('GET');
    httpRequest.flush([...mockList]);

    await fixture.detectChanges();

    const list = await loader.getAllHarnesses(MatListItemHarness);

    expect(list.length).toBe(2);
    expect(await list[0].getText()).toContain(mockList[0].title);
    expect(await list[1].getText()).toContain(mockList[1].title);
  });

  it('should change status of done when done is clicked', async () => {
    component.toDoList = [];
    initialLoad.and.callThrough();
    component.ngOnInit();
    const httpRequest = http.expectOne(`${environment.baseUrl}/todos?userId=1`);
    expect(httpRequest.request.method).toBe('GET');
    httpRequest.flush([...mockList]);

    await fixture.detectChanges();

    const checkboxs = await loader.getAllHarnesses(MatCheckboxHarness);
    expect(await checkboxs[0].isChecked()).toBe(false);

    await checkboxs[0].check();
    expect(await checkboxs[0].isChecked()).toBe(true);

    const httpUpdateRequest = http.expectOne(`${environment.baseUrl}/todos/1`);
    expect(httpUpdateRequest.request.method).toBe('PUT');
    httpUpdateRequest.flush({
      completed: true,
      id: 1,
    });
    expect(component.toDoList[0].completed).toBe(true);
  });
});
