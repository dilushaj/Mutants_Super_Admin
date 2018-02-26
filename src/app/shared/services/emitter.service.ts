import { Injectable,Output , EventEmitter } from '@angular/core';

@Injectable()
export class EmitterService {
  @Output() httpErrorEventEmitter: EventEmitter<any> = new EventEmitter();
  constructor() { }

  broadcastHttpErrorEventEmitter(response : any){
    this.httpErrorEventEmitter.emit(response);
  }

}
