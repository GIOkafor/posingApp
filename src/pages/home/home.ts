import { Component, ViewChild } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { MediaCapture } from '@ionic-native/media-capture';
import { Camera } from '@ionic-native/camera';
import { VgAPI } from 'videogular2/core';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('media') myVideo: any;

  //vgAPI stuff
  preload:string = 'auto';
  api: VgAPI;
  //toggle canvas display
  canvasShow:boolean = false;

  constructor(public navCtrl: NavController, private mediaCapture: MediaCapture, private camera: Camera, public events: Events) {
    
  }

  startRecording(){
  	this.mediaCapture.captureVideo((videodata) => {
  		alert(JSON.stringify(videodata));
  	})
  }

  selectVideo(){
  	let video = this.myVideo.nativeElement;
  	var options = {
  		sourceType : 2,
  		mediaType: 1
  	};

  	this.camera.getPicture(options)
  		.then(data => {
  			video.src = data;
  			video.play();
  		})
  }

  onPlayerReady(api:VgAPI){
    this.api = api;

    this.api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
        //set the video to the begining
        this.api.getDefaultMedia().currentTime = 0;
      }
    );

    //when video pauses, fire event listener
    this.api.getDefaultMedia().subscriptions.pause.subscribe(() => {
      console.log("Video paused at: ", this.api.getDefaultMedia().currentTime);
      this.showCanvas();
    });

    //when edits are finished resume video
    //hide canvas
    //event listener for when video played after pause event
    this.api.getDefaultMedia().subscriptions.play.subscribe(() => {
      console.log("Video resumed at: ", this.api.getDefaultMedia().currentTime);
      this.hideCanvas();
    });
  }

  showCanvas(){
    console.log("Setting canvas to true");
    this.canvasShow = true;
  }

  hideCanvas(){
    console.log("Setting canvas to false");
    this.canvasShow = false;
  }

  saveChanges(){}
}
