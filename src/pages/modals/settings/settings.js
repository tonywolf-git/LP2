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
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';
var SettingsPage = /** @class */ (function () {
    function SettingsPage(navCtrl, navParams, alertCtrl, fileCtrl, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.fileCtrl = fileCtrl;
        this.viewCtrl = viewCtrl;
        this.settings = {
            simple: '',
            bg: ''
        };
    }
    SettingsPage.prototype.checkBg = function () {
        var _this = this;
        this.fileCtrl.listDir(this.fileCtrl.applicationDirectory, 'www/assets/bgs')
            .then(function (res) {
            _this.bgArray = [];
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].name);
                _this.bgArray.push(res[i].name);
            }
            console.log(_this.bgArray);
        })
            .catch(function (err) { return console.error(err); });
    };
    SettingsPage.prototype.closeSettings = function () {
        console.log(this.settings);
        this.viewCtrl.dismiss(this.settings);
    };
    SettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsPage');
        this.checkBg();
        this.settings.bg = localStorage.getItem('bg');
        this.settings.simple = localStorage.getItem('simple');
    };
    SettingsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-settings',
            templateUrl: 'settings.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, AlertController, File, ViewController])
    ], SettingsPage);
    return SettingsPage;
}());
export { SettingsPage };
//# sourceMappingURL=settings.js.map