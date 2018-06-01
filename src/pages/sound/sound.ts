import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';

@IonicPage()
@Component({
  selector: 'page-sound',
  templateUrl: 'sound.html',
})
export class SoundPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public nativeAudio: NativeAudio) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SoundPage');
    this.nativeAudio.preloadSimple('amano', 'assets/sounds/amano.mp3').then(this.onSuccess, this.onError)       
    this.nativeAudio.preloadSimple('nuke1', 'assets/sounds/nuke01.mp3').then(this.onSuccess, this.onError)       
    this.nativeAudio.preloadSimple('nuke2', 'assets/sounds/nuke02.mp3').then(this.onSuccess, this.onError)       
    this.nativeAudio.preloadSimple('nuke3', 'assets/sounds/nuke03.mp3').then(this.onSuccess, this.onError)       
    this.nativeAudio.preloadSimple('nuke4', 'assets/sounds/nuke04.mp3').then(this.onSuccess, this.onError)       
    this.nativeAudio.preloadSimple('nuke5', 'assets/sounds/nuke05.mp3').then(this.onSuccess, this.onError)       
    this.nativeAudio.preloadSimple('nuke6', 'assets/sounds/nuke06.mp3').then(this.onSuccess, this.onError)       
  }

  stopSounds() {
    this.nativeAudio.stop('amano');
    this.nativeAudio.stop('nuke1');
    this.nativeAudio.stop('nuke2');
    this.nativeAudio.stop('nuke3');
    this.nativeAudio.stop('nuke4');
    this.nativeAudio.stop('nuke5');
    this.nativeAudio.stop('nuke6');
  }

  playAudio(audio) {
    switch (audio) {
      case 'amano':
      this.stopSounds();
      this.nativeAudio.play('amano', () => console.log('amano is done playing'));
        break;
      
      case 'nuke':
      this.stopSounds();
      var nukeArray = ['nuke1', 'nuke2', 'nuke3', 'nuke4', 'nuke5', 'nuke6']
      var rand = nukeArray[Math.floor(Math.random() * nukeArray.length)];
      this.nativeAudio.play(rand, () => console.log('nuke is done playing'));
      console.log('nukeArray: ', rand);
        break;
    
      default:
        break;
    }
  }

  onSuccess(msj) {
    console.log('Success:', msj);
  }

  onError(msj) {
    console.error('Error:', msj);
  }

}
