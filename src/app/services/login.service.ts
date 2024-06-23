import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtRequest } from '../models/jwtRequest';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(request: JwtRequest) {
    return this.http.post<{ jwttoken: string }>('http://localhost:8080/login', request).pipe(
      tap((response) => {
        let token = response.jwttoken;
        if (token && typeof window !== 'undefined') {
          if (!token.startsWith('Bearer ')) {
            token = `Bearer ${token}`;
          }
          sessionStorage.setItem('token', token);
          console.log('Token stored:', token);
        } else {
          console.error('No token found in response or sessionStorage is not available');
        }
      })
    );
  }

  verificar() {
    if (typeof window === 'undefined') {
      return false;
    }
    const token = sessionStorage.getItem('token');
    return token != null;
  }

  showRole() {
    if (typeof window === 'undefined') {
      return null;
    }
    const token = sessionStorage.getItem('token');
    if (!token) {
      return null;
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role;
  }
}
