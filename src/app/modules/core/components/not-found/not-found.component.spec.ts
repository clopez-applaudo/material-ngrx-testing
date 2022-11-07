import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NotFoundComponent } from './not-found.component';

@Component({
  selector: 'app-mockComponent',
  template: ''
})
class MockComponent {}

const mockRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: MockComponent
  },
  {
    path: 'dashboard',
    component: MockComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFoundComponent ],
      imports: [
        RouterTestingModule.withRoutes(mockRoutes),
      ],
    })
    .compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to dashboard when anchor is clicked', async () => {
    const anchor = fixture.debugElement.query(By.css('a'));
    anchor.nativeElement.click();
    anchor.triggerEventHandler('click', {});
    await fixture.whenStable().then(() => {
      expect(location.path()).toBe('/dashboard');
    });
  });
});
