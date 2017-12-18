import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
	bgArray: any;
	settings = {
		simple : '',
		bg : '',
		flipP1: ''
	};

	constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public fileCtrl: File, public viewCtrl: ViewController) {
	}

	checkBg() {
		this.fileCtrl.listDir(this.fileCtrl.applicationDirectory, 'www/assets/bgs')
		.then(res => {
			this.bgArray = [];
			for (var i = 0; i < res.length; i++) {
				console.log(res[i].name);
				this.bgArray.push(res[i].name);
			}
			console.log(this.bgArray);
		})
		.catch(err => console.error(err));
	}

	closeSettings() {
		console.log(this.settings);
		this.viewCtrl.dismiss(this.settings);
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SettingsPage');
		this.checkBg();
		this.settings.bg = localStorage.getItem('bg');
		this.settings.simple = localStorage.getItem('simple');
		this.settings.flipP1 = JSON.parse(localStorage.getItem('customAR'))[0].flipped;
	}
}
