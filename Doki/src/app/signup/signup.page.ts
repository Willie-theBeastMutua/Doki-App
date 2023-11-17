import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

 

  ngOnInit() {
  }
  constructor(private navCtrl: NavController) {}

  navigateToLogin() {
    this.navCtrl.navigateBack('/login');
  }

}
