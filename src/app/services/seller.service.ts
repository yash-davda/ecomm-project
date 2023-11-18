import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Login, SignUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter <boolean>(false);
  constructor(private http: HttpClient, private route: Router) { }
  userSignUp(data: SignUp) {
    this.http.post('http://localhost:3000/seller', data, { observe: 'response' }).subscribe((result) => {
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(result.body));
      this.route.navigate(['seller-home']);
    });
  }
  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.route.navigate(['seller-home']);
    }
  }
  userLogin(data: Login) {
    console.log(data);
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result:any) => {
      console.log(result);
      if (result && result.body && result.body.length) {
        console.log('User Logged In');
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.route.navigate(['seller-home']);
      }
      else {
        console.log('User Logged In Failed');
        this.isLoginError.emit(true);
      }
    })
  }
}
