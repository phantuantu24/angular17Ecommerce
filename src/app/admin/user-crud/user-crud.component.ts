import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { Address, User } from '../../core/Model/object-model';
declare var $: any;

@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [ReactiveFormsModule],
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
  popupHeader!: string;
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
    this.popupHeader = "Add new User";
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

      this.adminService.addUser(this.userDto).subscribe((_res) => {
        this.addEditUserForm.reset();
        this.getAllUser();
        // $('#addEditUserModal').modal('toggle');
      })
    }
  }

  editUserPopup(userId: string) {
    this.editUserId = userId;
    this.isAddUser = false;
    this.popupHeader = 'Edit User';

    this.adminService.getUserDetail(userId).subscribe((res) => {
      this.signleUserData = res;
      delete (this.signleUserData as Partial<User>).id;

      this.uploadFileName = this.signleUserData.uploadPhoto;
      const { address, ...rest } = this.signleUserData;
      delete (address as Partial<Address>).id;

      this.addEditUserForm.setValue({
        ...rest,
        ...address,
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
      const { addLine1, addLine2, city, state, zipCode } = this.userRegData;
      this.userDto = {
        ...this.userRegData,
        id: this.editUserId,
        address: {
          id: 0,
          addLine1,
          addLine2,
          city,
          state,
          zipCode
        },
      }

      this.adminService.editUser(this.userDto).subscribe((res) => {
        this.addEditUserForm.reset();
        this.getAllUser();
        // $('#addEditUserModal').modal('toggle');
      })
    }
  }

  deleteUser(userId: string | number) {
    this.adminService.deleteUser(userId).subscribe((_res) => this.getAllUser());
  }

  trackUsers(_index: number, user: User) {
    return user.id;
  }
}
