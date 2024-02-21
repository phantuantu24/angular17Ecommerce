import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

// admin before login check
export const AdminAuthLoginGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
  const role = sessionStorage.getItem('role');
  return role !== 'admin' ? true : inject(Router).createUrlTree(['/admin-dashboard'])
}

// admin service check
export const AdminAuthServiceGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
  const role = sessionStorage.getItem('role');
  return role === 'admin' ? true : inject(Router).createUrlTree(['/admin-login'])
}

// customer (buyer & seller) before login check
export const SellerBuyerAuthLoginGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
  const role = sessionStorage.getItem('role');
  const sellerOrBuyer: boolean = role === 'seller' || role === 'buyer';
  return !sellerOrBuyer ? true : inject(Router).createUrlTree([`/${role}-dashboard`])
}

export const BuyerAuthServiceGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
  const role = sessionStorage.getItem('role');
  return role === 'buyer' ? true : inject(Router).createUrlTree([`/sign-in`])
}

export const SellerAuthServiceGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
  const role = sessionStorage.getItem('role');
  return role === 'seller' ? true : inject(Router).createUrlTree([`/sign-in`])
}