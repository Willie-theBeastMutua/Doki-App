import { Component, OnInit } from '@angular/core';
import {ElementRef, ViewChild } from '@angular/core';
import axios from 'axios';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild('chatContent', { read: ElementRef }) chatContent!: ElementRef;

  messages: { content: string; sender: 'user' | 'assistant' }[] = [
    { content: 'Hello', sender: 'assistant' },
    { content: 'How can I help you?', sender: 'assistant' },
  ];

  userInput: string = '';

  sendMessage() {
    const apiKey = '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';
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      }

    };
    if (this.userInput.trim() !== '') {
      this.messages.push({ content: this.userInput, sender: 'user' });
      axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        // model: "gpt-3.5-turbo",
        prompt: 'from the medical and health field explain' + this.userInput,
        // organization_id:'org-HDc8I811J5cuJN60feR56Gym',
        temperature: 0.5,
        max_tokens: 100
      }, config)
        .then((response) => {
          console.log('here is the response:', response);
          this.messages.push({ content: response.data.choices[0].text, sender: 'assistant' });
        })
        .catch(function (error) {
          console.log('errorrs ndo izi:', error);
        });
      this.userInput = '';
      this.scrollDown();

    }
  }
  
  scrollDown() {
    try {
      this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err);
    }
  }
  

  ngOnInit() {
  }
constructor(private navCtrl: NavController) {}

  navigateToHome() {
    this.navCtrl.navigateBack('/home');
  }
}
