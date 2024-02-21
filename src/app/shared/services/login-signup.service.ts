import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { User } from '../../core/Model/object-model';

@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {

  baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient, private apiService: ApiService) { }

  authLogin(userName: string, password: string) {
    const url = `${this.baseUrl}/user?email=${userName}&password=${password}`;
    return this.apiService.get(url);
  }

  userRegister(userDto: User) {
    return this.apiService.post(`${this.baseUrl}/user`, userDto);
  }

  adminLogin(userName: string, password: string) {
    const url = `${this.baseUrl}/user?email=${userName}&password=${password}&role=admin`;
    return this.apiService.get(url);
  }
}
