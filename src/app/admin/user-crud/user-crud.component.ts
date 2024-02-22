import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { User } from '../../core/Model/object-model';
declare var JQuery: any;

@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.scss'
})
export class UserCrudComponent implements OnInit {

  allUserData: User[] = [];
  signleUserData!: User;
  addEditUserForm!: FormGroup;
  userDto!: User;
  userRegData!: any;
  editUserId!: string | number;
  uploadFileName!: string;
  addEditUser: boolean = false; // For form validation
  isAddUser: boolean = false;
  popupheader!: string;
  singleFormValue: Object = {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.getAllUser();
    this.addEditUserForm = this.formBuilder.group({
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

  getAllUser() {
    this.adminService.allUsers().subscribe((data: User[]) => {
      this.allUserData = data;
    })
  }

  get rf() {
    return this.addEditUserForm.controls;
  }

  addUserPopup() {
    this.isAddUser = true;
    this.popupheader = "Add new User";
    this.addEditUserForm.reset();
  }

  addUser() {
    this.addEditUser = true;
    if (this.addEditUserForm.invalid) {
      alert('Error!! :-)' + JSON.stringify(this.addEditUserForm.value));
      return;
    } else {
      this.userRegData = this.addEditUserForm.value;
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

      this.adminService.addUser(this.userDto).subscribe((res) => {
        this.getAllUser();
        JQuery('#addEditUserModal').modal('toggle');
      })
    }
  }

  editUserPopup(userId: string | number) {
    this.editUserId = userId;
    this.isAddUser = false;
    this.popupheader = 'Edit User';
    this.adminService.getUserDetail(userId).subscribe((res) => {
      this.signleUserData = res;
      this.uploadFileName = this.signleUserData.uploadPhoto;

      const { addLine1, addLine2, city, state, zipCode } = this.signleUserData.address;
      this.addEditUserForm.setValue({
        ...this.signleUserData,
        addLine1,
        addLine2,
        city,
        state,
        zipCode,
        uploadPhoto: ''
      })
    })
  }

  updateUser() {
    if (this.addEditUserForm.invalid) {
      alert('Error!! :-)' + JSON.stringify(this.addEditUserForm.value));
      return;
    } else {
      this.userRegData = this.addEditUserForm.value;
      const { addLine1, addLine2, city, state, zipCode, uploadPhoto } = this.userRegData;
      this.userDto = {
        ...this.userRegData,
        address: {
          id: 0,
          addLine1,
          addLine2,
          city,
          state,
          zipCode
        },
        uploadPhoto: uploadPhoto || this.uploadFileName
      }

      this.adminService.editUser(this.userDto).subscribe((res) => {
        this.getAllUser();
        JQuery('#addEditUserModal').modal('toggle');
      })
    }
  }

  deleteUser(userId: string | number) {
    this.adminService.deleteUser(userId).subscribe((_res) => this.getAllUser());
  }
}
