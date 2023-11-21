import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  constructor(private authService: AuthService ,private navCtrl: NavController) {}

  onSubmit() {
    // Call the login method with both email and password
    this.authService.login(this.email, this.password).subscribe(
      response => {
        // Handle successful login response
        console.log('Login successful:', response);
        // Redirect or navigate to another page upon successful login
        this.navCtrl.navigateRoot('/home'); // 
      },
      error => {
        // Handle login error
        console.error('Login error:', error);
        // Display an alert or handle the error as needed
      }
    );
  }
}
