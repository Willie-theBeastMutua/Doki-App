import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  onClick() {
    console.log('Button clicked!');
    // You can add additional logic here

    // Navigate to the specified component
    // this.router.navigate(['/another-component']);
  }

  constructor() {}

}
