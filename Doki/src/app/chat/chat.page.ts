import { Component, OnInit, ViewChild } from '@angular/core';
import { DokiService } from 'src/app/services/doki.service'

import { NavController, IonContent, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content!: IonContent;

  constructor(private dokiService: DokiService, private loadingController: LoadingController) { }

  // create an array of messages to be displayed
  messages: { content: string; sender: 'user' | 'assistant' }[] = [
    { content: 'Hello', sender: 'assistant' },
    { content: 'How can I help you?', sender: 'assistant' },
  ];

  userInput: string = '';
  isLoading: boolean = false;

  // method to be called on send click in chat
  async sendMessage() {
    // check if user entered an input
    if (this.userInput.trim() !== '') {
      this.isLoading = true;
      const loading = await this.loadingController.create({
        message: 'Loading...',
        duration: 30000, // Adjust the duration as needed
      });
      await loading.present();

      this.messages.push({ content: this.userInput, sender: 'user' });
      // method to send data to service   
      this.transferDataToDokiService();
      this.userInput = '';

      // call to the service running API
      const result = await this.dokiService.getDokiResponse();
      console.log(result);
      // .then((responseData) => {
      // push response to the messages array
      // console.log(responseData);
      this.messages.push({ content: result, sender: 'assistant' });
      this.content.scrollToBottom(500);
      this.isLoading = false;
      loading.dismiss();

      // console.log(responseData);
      // })
      // .catch((error) => {
      // console.error(error);
    };


  }

ngOnInit() {
  
}
  ngAfterViewInit() {
    this.content = this.content
  }
  transferDataToDokiService() {
    const dataToTransfer = this.userInput;
    this.dokiService.setData(dataToTransfer);
  }
  

}
