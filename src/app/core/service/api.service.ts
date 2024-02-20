import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOption = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    })
  }

  constructor(private http: HttpClient) { }

  private formatError(error: any): Observable<never> {
    return throwError(() => error.error)
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(path, { params }).pipe(catchError(this.formatError))
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(path, JSON.stringify(body)).pipe(catchError(this.formatError))
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(path, JSON.stringify(body)).pipe(catchError(this.formatError))
  }

  delete(path: string): Observable<any> {
    return this.http.delete(path).pipe(catchError(this.formatError))
  }
}
