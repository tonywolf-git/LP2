var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { DomSanitizer } from '@angular/platform-browser';
import { SettingsPage } from '../modals/settings/settings';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, alertCtrl, fileCtrl, fChooser, sanitizer, modalCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.fileCtrl = fileCtrl;
        this.fChooser = fChooser;
        this.sanitizer = sanitizer;
        this.modalCtrl = modalCtrl;
        this.players = [];
        this.defaultLP = 8000;
    }
    HomePage.prototype.playersChanged = function (number) {
        this.players = [];
        for (var i = 1; i <= number; i++) {
            this.players.push({ id: i, lp: this.defaultLP });
        }
    };
    HomePage.prototype.openSettings = function () {
        console.log('Clicked Settings');
        var profileModal = this.modalCtrl.create(SettingsPage, {});
        profileModal.onDidDismiss(function (data) {
            console.log(data);
            document.getElementById("elBG").style.backgroundImage = "url('assets/bgs/" + data.bg + "')";
            localStorage.setItem('bg', data.bg);
            localStorage.setItem('simple', data.simple);
        });
        profileModal.present();
    };
    HomePage.prototype.checkBg = function () {
        var _this = this;
        this.fileCtrl.listDir(this.fileCtrl.applicationDirectory, 'www/assets/bgs')
            .then(function (res) {
            //ARMANDO LA ALERTA
            var alert = _this.alertCtrl.create();
            alert.setTitle('Seleccionar Jugadores');
            alert.addButton('Cancel');
            alert.addButton({
                text: 'OK',
                handler: function (data) {
                    console.log(data);
                    document.getElementById("elBG").style.backgroundImage = "url('assets/bgs/" + data + "')";
                    localStorage.setItem('bg', data);
                }
            });
            alert.present();
            _this.bgArray = [];
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].name);
                _this.bgArray.push(res[i].name);
                alert.addInput({
                    type: 'radio',
                    label: res[i].name,
                    value: res[i].name,
                    checked: false
                });
            }
            console.log(_this.bgArray);
        })
            .catch(function (err) { return console.error(err); });
    };
    HomePage.prototype.showRadio = function () {
        var _this = this;
        var alert = this.alertCtrl.create();
        alert.setTitle('Seleccionar Jugadores');
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
            handler: function (data) {
                _this.playersChanged(data);
            }
        });
        alert.present();
    };
    HomePage.prototype.remove = function (player) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Remove LP',
            inputs: [
                {
                    name: 'lp',
                    placeholder: '0',
                    type: 'cel'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Remove',
                    handler: function (data) {
                        _this.players[player.id - 1].lp -= parseInt(data.lp);
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.add = function (player) {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Add LP',
            inputs: [
                {
                    name: 'lp',
                    placeholder: '0',
                    type: 'cel'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Add',
                    handler: function (data) {
                        _this.players[player.id - 1].lp += parseInt(data.lp);
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.reiniciar = function (evento) {
        setTimeout(function () {
            console.log('Async operation has ended');
            evento.complete();
        }, 500);
    };
    HomePage.prototype.chooseBg = function () {
        var _this = this;
        this.fChooser.open()
            .then(function (uri) {
            //console.log(uri);
            _this.imagenCosa = _this.sanitizer.bypassSecurityTrustUrl(uri);
            //copyFile(path, fileName, newPath, newFileName);
            //this.fileCtrl.copyFile();
            _this.fileCtrl.writeFile(_this.fileCtrl.externalDataDirectory, 'PRUBE.jpg', _this.imagenCosa)
                .then(function (res) {
                console.log(res);
            })
                .catch(function (err) {
                console.error(err);
            });
            //console.log(this.imagenCosa);
        })
            .catch(function (e) { return console.log(e); });
    };
    HomePage.prototype.ionViewDidLoad = function () {
        if (!localStorage.getItem('bg')) {
            console.error('NO EXISTE "bg"');
            localStorage.setItem('bg', '1.jpg');
            console.log('No hay local guardada: ', localStorage.getItem('bg'));
            document.getElementById("elBG").style.backgroundImage = "url('assets/bgs/" + localStorage.getItem('bg') + "')";
        }
        else {
            console.log('Si Existe "bg"');
            console.log('Hay local guardada: ', localStorage.getItem('bg'));
            document.getElementById("elBG").style.backgroundImage = "url('assets/bgs/" + localStorage.getItem('bg') + "')";
        }
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController, AlertController, File, FileChooser, DomSanitizer, ModalController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map