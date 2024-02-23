import { Component, OnInit } from '@angular/core';
import { Product, User } from '../../core/Model/object-model';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  userDashboardData: User[] = [];
  totalUser: number = 0;
  adminUser: number = 0;
  sellerUser: number = 0;
  buyerUser: number = 0;

  productDashboardData: Product[] = [];
  totalProduct: number = 0;
  publishProduct: number = 0;
  inactiveProduct: number = 0;
  draftProduct: number = 0;

  constructor(private router: Router, private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAdminUserDashboard();
    this.getAdminProductDashboard();
  }

  redirectTo(url: string) {
    this.router.navigateByUrl(`/admin/${url}`)
  }

  getAdminUserDashboard() {
    this.adminService.userDashboardData().subscribe((data: User[]) => {
      this.userDashboardData = data;
      
      this.totalUser = data.length;
      data.forEach((item: User) => {
        item.role === 'admin' && this.adminUser++;
        item.role === 'seller' && this.sellerUser++;
        item.role === 'buyer' && this.buyerUser++;
      })
      
    })
  }

  getAdminProductDashboard() {
    this.adminService.productDashboardData().subscribe((data: Product[]) => {
      this.productDashboardData = data;

      this.totalProduct = data.length;
      data.forEach((item: Product) => {
        item.status === 'publish' && this.publishProduct++;
        item.status === 'inactive' && this.inactiveProduct++;
        item.status === 'draft' && this.draftProduct++;
      })
    })
  }
}
