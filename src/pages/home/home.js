var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { MediaCapture } from '@ionic-native/media-capture';
import { Camera } from '@ionic-native/camera';
var HomePage = (function () {
    function HomePage(navCtrl, mediaCapture, camera, events) {
        this.navCtrl = navCtrl;
        this.mediaCapture = mediaCapture;
        this.camera = camera;
        this.events = events;
    }
    HomePage.prototype.startRecording = function () {
        this.mediaCapture.captureVideo(function (videodata) {
            alert(JSON.stringify(videodata));
        });
    };
    HomePage.prototype.selectVideo = function () {
        var video = this.myVideo.nativeElement;
        var options = {
            sourceType: 2,
            mediaType: 1
        };
        this.camera.getPicture(options)
            .then(function (data) {
            video.src = data;
            video.play();
        });
    };
    return HomePage;
}());
__decorate([
    ViewChild('myvideo'),
    __metadata("design:type", Object)
], HomePage.prototype, "myVideo", void 0);
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    }),
    __metadata("design:paramtypes", [NavController, MediaCapture, Camera, Events])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map