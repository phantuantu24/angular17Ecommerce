import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../core/Model/object-model';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signin-signup',
  standalone: true,
  // If you want to use *ngIf in HTML then you need to import CommonModule, else you must use @if @else
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './signin-signup.component.html',
  styleUrl: './signin-signup.component.scss'
})
export class SigninSignupComponent {
  regForm: boolean = false;
  signUpForm!: FormGroup;
  signInForm!: FormGroup;

  signUpSubmitted: boolean = false;
  href: string = '';
  userData: User[] = [];
  userDto!: User;
  userRegData: any;
  signInFormValue = {
    userEmail: '',
    userPassword: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginSignupService: LoginSignupService
  ) { }

  ngOnInit(): void {
    this.href = this.router.url;
    if (this.href === '/sign-up') {
      this.regForm = true;
    } else if (this.href === '/sign-in') {
      this.regForm = false;
    }

    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobNumber: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      addLine1: ['', Validators.required],
      addLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      language: ['', Validators.required],
      gender: ['', Validators.required],
      aboutYou: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      agreetc: ['', Validators.required],
      role: ['', Validators.required],
    })
  }

  get signUpFormControl() {
    return this.signUpForm.controls
  }

  onSubmitSignUp() {
    this.signUpSubmitted = true;
    if (this.signUpForm.invalid) return;

    this.userRegData = this.signUpForm.value;
    const { addLine1, addLine2, city, state, zipCode } = this.userRegData;
    this.userDto = {
      ...this.userRegData,
      address: {
        id: 0,
        addLine1,
        addLine2,
        city,
        state,
        zipCode
      }
    }

    const observer = this.loginSignupService.userRegister(this.userDto);
    observer.subscribe((_res) => {
      alert('User Register Successful');
      this.router.navigateByUrl('/sign-in');
    })
  }

  onSubmitSignIn() {
    const { userEmail, userPassword } = this.signInFormValue;
    console.log(this.signInFormValue);
    
    const observer = this.loginSignupService.authLogin(userEmail, userPassword);
    observer.subscribe((res) => {
      this.userData = res;
      if (this.userData.length > 0) {
        const user = this.userData[0];
        // Common session storage operations
        sessionStorage.setItem('user_session_id', user.id);
        sessionStorage.setItem('role', user.role);

        // Redirect based on role
        this.router.navigateByUrl(`/${user.role}-dashboard`);
      } else {
        alert('Invalid Login')
      }
    })
  }
}
