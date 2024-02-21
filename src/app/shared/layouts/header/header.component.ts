import { Component, DoCheck } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements DoCheck {
  loggedIn: boolean = false;
  language: string = 'en';
  userRole: string | null = '';

  constructor(private router: Router) { }

  ngDoCheck(): void {
    this.userRole = sessionStorage.getItem('role');
    const user_session_id = sessionStorage.getItem('user_session_id');
    user_session_id && (this.loggedIn = true);
  }

  logOut() {
    this.loggedIn = false;
    sessionStorage.clear();
    this.router.navigateByUrl('/sign-in')
  }
}
