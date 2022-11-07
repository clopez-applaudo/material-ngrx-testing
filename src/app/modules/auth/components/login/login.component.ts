import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userId!: number;

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) {}

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
    this.loginService.login('test').subscribe({
      next: () => this.router.navigate(['dashboard'], { queryParams: { id: this.userId } }),
      error: (error) => throwError(error)
    });
  }

  getUserId(): void {
    this.userId = 1;
  }

  checkLoad(): void {
    console.log('This loads');
  }
}
