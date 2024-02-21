import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../core/Model/object-model';
import { LoginSignupService } from '../../shared/services/login-signup.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent implements OnInit {

  signInFormValue = {
    userEmail: '',
    userPassword: ''
  };
  userData!: User[];

  constructor(
    private router: Router,
    private loginService: LoginSignupService
  ) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmitLogin() {
    const { userEmail, userPassword } = this.signInFormValue;
    const observer = this.loginService.adminLogin(userEmail, userPassword);
    observer.subscribe((res) => {
      this.userData = res;
      if (this.userData.length > 0) {
        const user = this.userData[0];
        // Common session storage operations
        sessionStorage.setItem('user_session_id', user.id);
        sessionStorage.setItem('role', user.role);

        // Redirect based on role
        this.router.navigateByUrl(`/admin-dashboard`);
      } else {
        alert('Invalid Response')
      }
    })
  }

}
