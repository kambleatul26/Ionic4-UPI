import { WebIntent } from '@ionic-native/web-intent/ngx';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  payeeVPA: string;
  payeeName: string;
  transactionNote: string = 'Payment for Groceries';
  payAmount: number;
  currency: string = 'INR';
  transactionReference: string;

  constructor(private webIntent: WebIntent) {}

  pay() {

    this.payeeVPA = '7303718165@upi';
    this.payeeName = 'Dhawal%20Mali';
    this.payAmount = 20;
    this.transactionReference = '#87148172'; //ORDER ID or Something similar

    const url = 'upi://pay?pa=' + this.payeeVPA + '&pn=' + this.payeeName + '&tr=' + this.transactionReference + 'tn=' + this.transactionNote + '&am=' + this.payAmount + '&cu=' + this.currency;
    const options = {
      action: this.webIntent.ACTION_VIEW,
      url
    };
    this.webIntent.startActivityForResult(options).then(success => {
      console.log(success);
      if(success.extras.Status == 'SUCCESS') {
        // SUCCESS RESPONSE
      } else if(success.extras.Status == 'SUBMITTED') {
        // SUBMITTED RESPONSE
      } else if(success.extras.Status == 'Failed' || success.extras.Status == 'FAILURE') {
        // FAILED RESPONSE
      } else {
        // FAILED RESPONSE
      }
    }, error => {
      console.log(error);
    });
  }

}
