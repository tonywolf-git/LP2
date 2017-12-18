import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { DomSanitizer } from '@angular/platform-browser';

import { Events } from 'ionic-angular';

import { SettingsPage } from '../modals/settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	players = [];
	defaultLP = 8000;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public fileCtrl: File, public fChooser: FileChooser, public sanitizer: DomSanitizer, public modalCtrl: ModalController, public events: Events) {
    events.subscribe('players:changed', (players) => {
      console.log('"this.players" Changed:', players);  
    });
  }

  bgArray: any;
  imagenCosa: any;
  modoSimple: any;
  log = [];

  customAR = [
    {one: 0, two: 0, flipped: false},
    {one: 0, two: 0, flipped: false},
    {one: 0, two: 0, flipped: false},
    {one: 0, two: 0, flipped: false}
  ]

  zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }

  playersChanged(number) {
  	this.players = [];
  	for (var i = 1; i <= number; i++) {
  		this.players.push({id: i, lp: this.defaultLP, arOne: this.customAR[i-1].one, arTwo: this.customAR[i-1].two, flipped: (this.customAR[i-1].flipped || false)});
  	}
    //this.events.publish('players:changed', this.players);
    return new Promise((resolve, reject) => {
      resolve(this.players);
      reject('No?');
    });
  }

  openSettings() {
    console.log('Clicked Settings');
    let profileModal = this.modalCtrl.create(SettingsPage, {});
    profileModal.onDidDismiss(data => {
      console.log(data);
      try {
        document.getElementById("elBG").style.backgroundImage = "url('assets/bgs/"+data.bg+"')";
        localStorage.setItem('bg', data.bg);
        localStorage.setItem('simple', data.simple);
        this.modoSimple = localStorage.getItem('simple');
        this.customAR[0].flipped = data.flipP1;
        this.players[0].flipped = this.customAR[0].flipped;
        if (this.players[0].flipped == true) {
          document.getElementById('player1').classList.add('flipped');
        } else {
          document.getElementById('player1').classList.remove('flipped');
        }
        localStorage.setItem('customAR', JSON.stringify(this.customAR));
      }catch(err) {
        console.error('Go back pressed.')
      }
    });
    profileModal.present();
  }

  checkBg() {
    this.fileCtrl.listDir(this.fileCtrl.applicationDirectory, 'www/assets/bgs')
    .then(res => {

      //ARMANDO LA ALERTA
      let alert = this.alertCtrl.create();
      alert.setTitle('How many Players?');
      alert.addButton('Cancel');
      alert.addButton({
        text: 'OK',
        handler: data => {
          console.log(data);
          document.getElementById("elBG").style.backgroundImage = "url('assets/bgs/"+data+"')";
          localStorage.setItem('bg', data);
        }
      });
      alert.present();

      this.bgArray = [];
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].name);
        this.bgArray.push(res[i].name);

        alert.addInput({
          type: 'radio',
          label: res[i].name,
          value: res[i].name,
          checked: false
        });
      }
      console.log(this.bgArray);
    })
    .catch(err => console.error(err));
  }

  showPlayers() {
    let alert = this.alertCtrl.create();
    alert.setTitle('How many Players?');

    alert.addInput({
      type: 'radio',
      label: '1',
      value: '1',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: '2',
      value: '2',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: '3',
      value: '3',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: '4',
      value: '4',
      checked: false
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.playersChanged(data).then(succ => {
          console.log('LINEA 147: ', succ);

          setTimeout(function(){
            if (succ[0].flipped == true) {
              console.log(succ);
              document.getElementById('player1').classList.add('flipped');
              console.log('LINEA 150: "FLIPPED ES TRUE"');
            } else {
              document.getElementById('player1').classList.remove('flipped');
              console.log('LINEA 153: "FLIPPED ES FALSE"')
            }
          }, 100);
        });
      }
    });
    alert.present();
  }

  remove(player) {
  	const alert = this.alertCtrl.create({
  		title: 'Remove LP',
  		inputs: [
  			{
  				name: 'lp',
  				placeholder: '0',
  				type: 'number'
  			},
  		],
  		buttons: [
  			{
  				text: 'Cancel',
  				role: 'cancel',
  				handler: data => {
  					console.log('Cancel clicked');
  				}
  			},
  			{
  				text: 'Remove',
  				handler: data => {
            //this.players[player.id-1].lp = this.zeroPad((this.players[player.id-1].lp -= parseInt(data.lp)), 4);
            this.players[player.id-1].lp -= parseInt(data.lp);
            this.log.push('Player ' + String(player.id) + ' : -' + data.lp + ' LP');
            console.log(this.log);
            localStorage.setItem('log', JSON.stringify(this.log));
            this.events.publish('lp:changed', this.log, Date.now());
  				}
  			}
  		]
  	});
  	alert.present();
  }

  add(player) {
  	const alert = this.alertCtrl.create({
  		title: 'Add LP',
  		inputs: [
  			{
  				name: 'lp',
  				placeholder: '0',
  				type: 'tel'
  			},
  		],
  		buttons: [
  			{
  				text: 'Cancel',
  				role: 'cancel',
  				handler: data => {
  					console.log('Cancel clicked');
  				}
  			},
  			{
  				text: 'Add',
  				handler: data => {
  					//this.players[player.id-1].lp = this.zeroPad((this.players[player.id-1].lp += parseInt(data.lp)), 4);
            this.players[player.id-1].lp += parseInt(data.lp);
            this.log.push('Player ' + String(player.id) + ' : ' + data.lp + ' LP');
            console.log(this.log);
            localStorage.setItem('log', JSON.stringify(this.log));
            this.events.publish('lp:changed', this.log, Date.now());
  				}
  			}
  		]
  	});
  	alert.present();
  }

  editOne(id) {
    console.log(id);
    const alert = this.alertCtrl.create({
      title: 'Custom Value',
      inputs: [
        {
          name: 'lp',
          placeholder: '0',
          type: 'tel'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Set custom value.',
          handler: data => {
            console.log(data.lp);
            if(data.lp){
              this.customAR[id-1].one = parseInt(data.lp);
              this.players[id-1].arOne = parseInt(data.lp);
              localStorage.setItem('customAR', JSON.stringify(this.customAR));
            } else {
              this.customAR[id-1].one = 0;
              this.players[id-1].arOne = 0;
              localStorage.setItem('customAR', JSON.stringify(this.customAR));
            }
          }
        }
      ]
    });
    alert.present();
  }

  editTwo(id) {
    console.log(id);
    const alert = this.alertCtrl.create({
      title: 'Custom Value',
      inputs: [
        {
          name: 'lp',
          placeholder: '0',
          type: 'tel'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Set custom value.',
          handler: data => {
            console.log(data.lp);
            if(data.lp) {
              this.customAR[id-1].two = parseInt(data.lp);
              this.players[id-1].arTwo = parseInt(data.lp);
              localStorage.setItem('customAR', JSON.stringify(this.customAR));
            } else {
              this.customAR[id-1].two = 0;
              this.players[id-1].arTwo = 0;
              localStorage.setItem('customAR', JSON.stringify(this.customAR));
            }
          }
        }
      ]
    });
    alert.present();
  }

  arOne(player) {
    console.log(player.id);
    console.log(this.customAR[player.id-1].one);
    this.players[player.id-1].lp += this.customAR[player.id-1].one;
    this.log.push('Player ' + String(player.id) + ' : ' + this.customAR[player.id-1].one+ ' LP');
    console.log(this.log);
    localStorage.setItem('log', JSON.stringify(this.log));
    this.events.publish('lp:changed', this.log, Date.now());
  }

  arTwo(player) {
    console.log(player.id);
    console.log(this.customAR[player.id-1].two);
    this.players[player.id-1].lp += this.customAR[player.id-1].two;
    this.log.push('Player ' + String(player.id) + ' : ' + this.customAR[player.id-1].two+ ' LP');
    console.log(this.log);
    localStorage.setItem('log', JSON.stringify(this.log));
    this.events.publish('lp:changed', this.log, Date.now());
  }

  reiniciar(evento) {
  	setTimeout(() => {
  		console.log('Async operation has ended');
  		evento.complete();
  	}, 500);
  }

  chooseBg() {
    this.fChooser.open()
    .then(uri => {
      //console.log(uri);
      this.imagenCosa = this.sanitizer.bypassSecurityTrustUrl(uri);
      //copyFile(path, fileName, newPath, newFileName);
      //this.fileCtrl.copyFile();

      this.fileCtrl.writeFile(this.fileCtrl.externalDataDirectory, 'PRUBE.jpg', this.imagenCosa)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
      //console.log(this.imagenCosa);
    })
    .catch(e => console.log(e));
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');

      console.log('Current number of player: ', this.players.length);

      this.log.push('Duel restarted.');
      console.log(this.log);
      localStorage.setItem('log', JSON.stringify(this.log));
      this.events.publish('lp:changed', this.log, Date.now());

      switch (this.players.length) {
        case 0:
          console.log('0 Players, Nuffin happens.')
          break;

        case 1:
          this.players[0].lp = 8000;
          break;

        case 2:
          this.players[0].lp = 8000;
          this.players[1].lp = 8000;
          break;

        case 3:
          this.players[0].lp = 8000;
          this.players[1].lp = 8000;
          this.players[2].lp = 8000;
          break;

        case 4:
          this.players[0].lp = 8000;
          this.players[1].lp = 8000;
          this.players[2].lp = 8000;
          this.players[3].lp = 8000;
          break;
        
        default:
          console.log('THIS IS THE DEFAULT STUFF');
          break;
      }

      console.log('REFRESHER PLAYERS: ', this.players);

      refresher.complete();
    }, 500);
  }

  ionViewDidLoad() {
    if (!localStorage.getItem('bg')) {
      console.error('NO EXISTE "bg"');
      localStorage.setItem('bg', 'Universe.jpg');
      console.log('No hay local guardada: ', localStorage.getItem('bg'));
      document.getElementById("elBG").style.backgroundImage = "url('assets/bgs/"+ localStorage.getItem('bg') +"')";
    } else {
      console.log('Si Existe "bg"');
      console.log('Hay local guardada: ', localStorage.getItem('bg'));
      document.getElementById("elBG").style.backgroundImage = "url('assets/bgs/"+ localStorage.getItem('bg') +"')";
    }

    if (!localStorage.getItem('simple')) {
      console.error('NO EXISTE "simple"');
      localStorage.setItem('simple', 'false');
      this.modoSimple = 'false';
    } else {
      console.log('Si Existe "simple"');
      this.modoSimple = localStorage.getItem('simple');
    }

    if (!localStorage.getItem('customAR')) {
      console.error('NO EXISTE "customAR"');
      localStorage.setItem('customAR', JSON.stringify(this.customAR));
      this.customAR = this.customAR;
    } else {
      console.log('Si Existe "customAR"');
      this.customAR = JSON.parse(localStorage.getItem('customAR'));
      console.log(this.customAR);
    }
    this.showPlayers();
  }
}