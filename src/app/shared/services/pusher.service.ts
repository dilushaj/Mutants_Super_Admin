import { Injectable } from '@angular/core';

//https://blog.pusher.com/build-a-simple-chat-app-with-pusher-and-angular/
//npm install pusher-js --save
// .angular-cli.json
//"scripts": ["../node_modules/pusher-js/dist/web/pusher.min.js"]

//declare const Pusher: any;

@Injectable()
export class PusherService {

  pusher: any;
  messagesChannel: any;

  constructor() {
    this.initializePusher();
  }

  initializePusher(): void {
    /*this.pusher = new Pusher("de504dc5763aeef9ff52", {});
    this.messagesChannel = this.pusher.subscribe('order_book');
    this.messagesChannel.bind('data', (data) => {
      //console.log(data);
    });*/
  }

}
