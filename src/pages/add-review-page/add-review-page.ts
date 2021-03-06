import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the AddReviewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-review-page',
  templateUrl: 'add-review-page.html',
})
export class AddReviewPage {
  
  title: any;
  description: any;
  rating: any;

  constructor(public viewCtrl: ViewController) {
  }

  save():void{

  	let review = {
  		title: this.title,
  		description: this.description,
  		rating: this.rating
  	};

  	this.viewCtrl.dismiss(review);

  }

  close(): void{
  	this.viewCtrl.dismiss();
  }

}
