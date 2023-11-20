import { Component, OnInit } from '@angular/core';
import { DokiService } from 'src/app/services/doki.service'

import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  constructor(private dokiService: DokiService) { }

  // create an array of messages to be displayed
  messages: { content: string; sender: 'user' | 'assistant' }[] = [
    { content: 'Hello', sender: 'assistant' },
    { content: 'How can I help you?', sender: 'assistant' },
  ];

  userInput: string = '';
  // method to be called on send click in chat
  sendMessage() {
    // check if user entered an input
    if (this.userInput.trim() !== '') {
      this.messages.push({ content: this.userInput, sender: 'user' });
      // method to send data to service   
      this.transferDataToDokiService();
      // call to the service running API
      this.dokiService.getDokiResponse()
        .then((responseData) => {
          // push response to the messages array
          console.log(responseData);
          this.messages.push({ content: responseData, sender: 'assistant' });
          console.log(responseData);
        })
        .catch((error) => {
          console.error(error);
        });
      this.userInput = '';

    }
  }

  ngOnInit() {
  }
  transferDataToDokiService() {
    const dataToTransfer = this.userInput;
    this.dokiService.setData(dataToTransfer);
  }

}
