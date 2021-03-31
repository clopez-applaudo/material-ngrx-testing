import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: '<button (click)="login()">Login</button>',
})
export class MockLoginComponent implements OnInit {
  loginForm!: FormControl;

  ngOnInit(): void {
    this.setForm();
  }

  setForm(): void {
    this.loginForm = new FormControl('');
  }

  get form(): AbstractControl {
    return this.loginForm;
  }

  login(): void {}
}
