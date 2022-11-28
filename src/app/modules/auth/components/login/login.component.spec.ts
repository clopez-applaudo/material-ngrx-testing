import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { LoginService } from '../../services/login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Component, EventEmitter, Output } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-button',
  template: `<button class="inside-button" (click)='emit()'></button>`
})
export class MockButton {
  @Output() load = new EventEmitter();

  emit(): void {
    this.load.emit('Hello');
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let loader: HarnessLoader;
  let service: LoginService;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, MockButton],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [LoginService]
    }).compileComponents();

    router = TestBed.inject(Router);
    service = TestBed.inject(LoginService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should triggers redirection when login method is called', () => {
    spyOn(service, 'login').and.returnValue(of(true));
    spyOn(router, 'navigate');
    const user = 1;
    component.userId = user;

    component.login();

    expect(service.login).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledOnceWith(['dashboard'], {
      queryParams: { id: user },
    });
  });

  it('should assign userd id', () => {
    expect(component.userId).not.toBeDefined();

    component.getUserId();

    expect(component.userId).toBe(1);
  });

  it('should not submit the form if the fields are invalid', async () => {
    spyOn(component, 'login');
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    const button = await loader.getHarness(MatButtonHarness);

    await inputs[0].setValue('test@email.com');
    await button.click();

    const buttonStatus = await button.isDisabled();

    expect(buttonStatus).toBe(true);
    expect(component.login).not.toHaveBeenCalled();
  });

  it('should submit and call router navigate when the form is valid', async () => {
    spyOn(service, 'login').and.returnValue(of(true));
    spyOn(router, 'navigate');
    const user = 1;
    component.userId = user;
    const inputs = await loader.getAllHarnesses(MatInputHarness);
    const button = await loader.getHarness(MatButtonHarness);

    await inputs[0].setValue('test@email.com');
    await inputs[1].setValue('password');
    await button.click();

    expect(router.navigate).toHaveBeenCalledWith(['dashboard'], {
      queryParams: { id: user },
    });
  });

  it('should trigger method with checkLoad when app-button is clicked', () => {
    spyOn(console, 'log');
    const button = fixture.debugElement.query(By.css('.inside-button'));
    button.nativeElement.click();
    button.triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(console.log).toHaveBeenCalled();
  })
});
