import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';



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
  constructor(private http: HttpClient, private toastController: ToastController) { }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
    });
    toast.present();
  }
  signUp() {
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



  }
}
