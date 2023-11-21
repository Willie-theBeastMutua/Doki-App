import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  userData = {
    fName: '',
    lName: '',
    email: '',
    password: ''
  }

  ngOnInit() {
  }
  // private http: HttpClient, private toastController: ToastController) {}
  // private navCtrl: NavController
  constructor(private http: HttpClient, private toastController: ToastController,
    private router: Router) { }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }
  signUp() {
    if (this.userData.fName == '' || this.userData.lName == '') {
      this.router.navigate(['/signup'], { replaceUrl: true });
      this.presentToast("First and Last Name Required");

    }
    else if (this.userData.email == '' || this.userData.password == '') {
      this.router.navigate(['/signup'], { replaceUrl: true });
      this.presentToast("Email and password Required");

    }
    else {
      // if (form.valid) {
      this.http.post('http://localhost:3000/signup', this.userData)

        .subscribe(
          (response: any) => {
            console.log(response);
            console.log('Sign-up successful:', response);
            this.presentToast(response.message);
            this.userData = {
              fName: '',
              lName: '',
              email: '',
              password: ''
            };
          },
          (error) => {
            console.error('Sign-up error:', error);
            this.presentToast('Sign-up error');
          }
        );
      // }
    }

  }
}
