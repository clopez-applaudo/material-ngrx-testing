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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
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
    spyOn(router, 'navigate');
    const user = 1;
    component.userId = user;

    component.login();

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
});
