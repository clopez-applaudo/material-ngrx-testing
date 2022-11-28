import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap, ParamMap, Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';

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
  let paramSubject = new BehaviorSubject<ParamMap>(convertToParamMap({ request_token: 'asasasa'}));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotFoundComponent ],
      imports: [
        RouterTestingModule.withRoutes(mockRoutes),
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: paramSubject
          }
        }
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  describe('When token is retrieved successfully', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(NotFoundComponent);
      paramSubject.next(convertToParamMap({ request_token: 'asasasa'}));
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    // Testing a route.
    // Below there is an example of how to test a route as a unit testing. Besides this there is another 2 recommended ways to test.
    // 1. Testing the redirection directly with the original routes, which will make the test an integration testing since the routes will load modules (if lazy) or components. 
    // 2. Testing all the routes togeher in an individual spec file, which will be integration as well but the difference would be that you need to call the navigate method
    // manually and it will not represent a real flow from the user. 
  
    it('should redirect to dashboard when anchor is clicked', async () => { // this is to check that a route exist based on a mock copy of the current configuration.
      const anchor = fixture.debugElement.query(By.css('a'));
      anchor.nativeElement.click();
      anchor.triggerEventHandler('click', {});
      await fixture.whenStable().then(() => {
        expect(location.path()).toBe('/dashboard');
      });
    });
  
    it('save param map on component initialization', () => {
      expect(component.param).toBe('asasasa');
    })
  });

  describe(`when token doesn't exist`, () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(NotFoundComponent);
      paramSubject.next(convertToParamMap({}))
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it(`param map is null when doesn't exist`, () => {
      expect(component.param).toBeNull();
    })
  })
});
