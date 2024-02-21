export interface User {
  id: string;
  name: string;
  password: string;
  uploadPhoto: string;
  role: string
  mobNumber: string;
  address: Address;
  gender: string;
  language: string[];
  email: string;
  dob: string;
  agreetc: boolean;
  age: number;
  aboutYou: string;
}

export interface Address {
  id: number;
  addLine1: string;
  addLine2: string;
  city: string;
  state: string;
  zipCode: number
}

export interface Product {
  id: number;
  name: string;
  uploadPhoto: string;
  uploadDesc: string;
  mrp: number;
  dp: number;
  status: string
}

export interface Order {
  id: number;
  userId: number;
  sellerId: number;
  product: Product;
  deliveryAddress: Address;
  contact: number;
  dateTime: string
}