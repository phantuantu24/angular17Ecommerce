import { Injectable } from '@angular/core';
import { ApiService } from '../../core/service/api.service';
import { User } from '../../core/Model/object-model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  userUrl: string = 'http://localhost:3000/user';
  productUrl: string = 'http://localhost:3000/products';

  constructor(private apiService: ApiService) { }

  userDashboardData() {
    return this.apiService.get(`${this.userUrl}/`);
  }

  productDashboardData() {
    return this.apiService.get(this.productUrl);
  }

  allUsers() {
    return this.apiService.get(this.userUrl);
  }

  addUser(userDto: Partial<User>) {
    return this.apiService.post(`${this.userUrl}/`, userDto);
  }

  getUserDetail(userId: string) {
    return this.apiService.get(`${this.userUrl}/${userId}`)
  }

  editUser(userDto: User) {
    return this.apiService.put(`${this.userUrl}/${userDto.id}`, userDto);
  }
  
  deleteUser(userId: string | number) {
    return this.apiService.delete(`${this.userUrl}/${userId}`);
  }
}
