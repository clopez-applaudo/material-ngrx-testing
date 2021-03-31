import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userId!: number;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.setForm();
  }

  setForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get form(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  login(): void {
    this.router.navigate(['dashboard'], { queryParams: { id: this.userId } });
  }

  getUserId(): void {
    this.userId = 1;
  }
}
