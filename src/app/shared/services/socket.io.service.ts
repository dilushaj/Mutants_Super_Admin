import { Injectable } from '@angular/core';
//import * as io from 'socket.io-client';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

/*"scripts": [
  "../node_modules/socket.io-client/dist/socket.io.slim.js"
]*/

@Injectable()
export class SocketIoService {

  _socket: any;
  socketConnected$ = new BehaviorSubject<boolean>(false);
  baseUrl = "http://localhost:443/";
  option = {};

  constructor() {
    //this._socket = io(this.baseUrl, this.option);
    //
    //this._socket.on('connect', () => this.socketConnected$.next(true));
    //
    //this._socket.on('disconnect', () => this.socketConnected$.next(false));
    //
    //this.socketConnected$.asObservable().subscribe( connected => {
    //  console.log('Socket connected: ', connected);
    //});
    //
    //this._socket.on("event_name", data => {
    //  console.log(data);
    //});
  }

}
