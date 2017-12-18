import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {
  }
  word = 'TOSS THE COIN';
  boton = true;
  buttonDisabled = null;

  dacoin = "assets/imgs/DaCoinHeads.png"

  things = ['HEADS', 'TAILS'];
  thing = this.things[Math.floor(Math.random() * this.things.length)];

  randomThis() {
    this.buttonDisabled = true;
    this.word="TOSSING COIN";
    setTimeout(() => { this.word="TOSSING COIN."; }, 100);
    setTimeout(() => { this.word="TOSSING COIN.."; }, 500);
    setTimeout(() => { this.word="TOSSING COIN..."; }, 900);
    setTimeout(() => { 
      this.word=this.things[Math.floor(Math.random() * this.things.length)];
      this.changeCoin(this.word);
    }, 1300);
    
  	//this.word = this.things[Math.floor(Math.random() * this.things.length)];
  }

  changeCoin(result) {
    if (result == "TAILS") {
      this.dacoin = "assets/imgs/DaCoinTails.png";
      this.buttonDisabled = null;
    } else {
      this.dacoin = "assets/imgs/DaCoinHeads.png";
      this.buttonDisabled = null;
    }
  }
}
