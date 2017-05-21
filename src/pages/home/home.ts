import { Component, ViewChild } from '@angular/core';
import { NavController, Events, ModalController } from 'ionic-angular';
import { MediaCapture } from '@ionic-native/media-capture';
import { Camera } from '@ionic-native/camera';
import { VgAPI } from 'videogular2/core';
import {AddReviewPage} from '../add-review-page/add-review-page';
import {Reviews} from '../../providers/reviews';

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
  //reviews stuff
  reviews: any;

  constructor(public navCtrl: NavController, private mediaCapture: MediaCapture, private camera: Camera, public events: Events, public reviewService: Reviews, public modalCtrl: ModalController) {
    
  }

//reviews code start
  ionViewDidLoad(){

    console.log("Reviews View loaded"); 

    this.reviewService.getReviews().then((data) => {
      console.log(data);
      this.reviews = data;
    });
  }

  addReview(){
    //create new modal with AddReviewPage layout
    let modal = this.modalCtrl.create(AddReviewPage);

    //upon dismissal, if review field is filled out add review to list
    //of reviews and call createReview method
    modal.onDidDismiss(review => {
      if(review){
        this.reviews.push(review);
        this.reviewService.createReview(review);
      }
    });

    modal.present();

  }

  deleteReview(review){

    //remove locally
      let index = this.reviews.indexOf(review);

      //check if index is valid
      if(index > -1){
        this.reviews.splice(index, 1);
      }

    //remove from database
    this.reviewService.deleteReview(review._id);
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
