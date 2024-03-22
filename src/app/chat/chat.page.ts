import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DokiService } from 'src/app/services/doki.service'

import { NavController, IonList, IonItem, IonContent, LoadingController, IonInput } from '@ionic/angular';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, AfterViewInit {
  @ViewChild(IonContent, { static: false }) content!: IonContent;
  @ViewChild('list', { static: false }) list!: IonList;

  @ViewChild('inputField') inputField!: IonInput;


  constructor(private dokiService: DokiService, private loadingController: LoadingController, private ElementRef: ElementRef) { }

  // create an array of messages to be displayed
  messages: { content: string; role: 'user' | 'assistant' }[] = [
    { content: 'Hello', role: 'assistant' },
    { content: 'How can I help you?', role: 'assistant' },
  ];

  userInput: string = '';
  isLoading: boolean = false;

  // method to be called on send click in chat
  async sendMessage() {
    // check if user entered an input
    if (this.userInput.trim() !== '') {
      this.isLoading = true;
      const loading = await this.loadingController.create({
        // message: 'Loading...',
        duration: 30000,
        spinner: "dots" // Adjust the duration as needed
      });
      await loading.present();

      this.messages.push({ content: this.userInput, role: 'user' });
      // method to send data to service   
      this.transferDataToDokiService();
      this.userInput = '';

      // call to the service running API
      const result = await this.dokiService.getDokiResponse();
      console.log(result);


      this.messages.push({ content: result, role: 'assistant' });
      // this.content.scrollToBottom(500);
      this.isLoading = false;
      loading.dismiss();


      this.scrollListToBottom();

    };



  }

  scrollListToBottom() {
    const listContainer = this.ElementRef.nativeElement.querySelector('.list-inner-scroll');

    // Ensure that the list container exists
    if (listContainer) {
      setTimeout(() => {
        // Select items after a delay
        const items = listContainer.querySelectorAll('ion-item');

        if (items.length > 0) {
          const lastItem = items[items.length - 1] as HTMLElement;

          // Scroll to the last item after a short delay
          setTimeout(() => {
            lastItem.scrollIntoView({ behavior: 'smooth', block: 'end' });
          }, 100); // Adjust the delay as needed
        }
      }, 200); // Delay before selecting items
    }
  }




  ngOnInit() {

  }

  ngAfterViewInit() {

  }
  transferDataToDokiService() {
    const dataToTransfer = this.userInput;
    this.dokiService.setData(dataToTransfer);
  }


}
