import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];

  addMessage(m:string) {
    this.messages.unshift(m);
  }

  clear() {
    this.messages = [];
  }

  constructor() { }
}
