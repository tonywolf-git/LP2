import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

	log = JSON.parse(localStorage.getItem('log'));

  constructor(public navCtrl: NavController, public events: Events) {
  	events.subscribe('lp:changed', (log) => {
      console.log('"this.lp" Changed:', log);
      this.log = JSON.parse(localStorage.getItem('log'));
    });
  }
}
