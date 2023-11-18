import { Component } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router'
import { SignUp } from '../data-type';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {
  showLogin = false;
  isAuthError = '';
  constructor(private seller: SellerService, private router: Router) {

  }
  ngOnInit() {
    this.seller.reloadSeller();
  }
  signUp(data: SignUp): void {
    console.log(data);
    this.seller.userSignUp(data);
  }
  login(data: SignUp): void {
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.isAuthError = 'User Email Or Password Is Not Correct';
      }
    })
  }
  openLogin() {
    this.showLogin = true;
  }
  openSignup() {
    this.showLogin = false;
  }
  
}
