import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  messages: { content: string; sender: 'user' | 'assistant' }[] = [
    // { content: 'Hello!oooooo', sender: 'user' },
    { content: 'In the tranquil moonlit embrace of an ancient forest, where the ethereal whispers of rustling leaves danced with the nocturnal symphony of crickets, a solitary owl soared gracefully, its wings tracing intricate patterns against the star-studded canvas of the night sky, weaving tales of mystique and timeless wonder.!', sender: 'assistant' },
    { content: 'How can I help you?', sender: 'assistant' },
  ];

  userInput: string = '';

  sendMessage() {
    const apiKey = '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';
    const config = {
      headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,}
      
    };
    console.log('Request Headers:', config.headers);
    axios.post('https://api.openai.com/v1/engines/text-davinci-002/completions', {
      // model: "gpt-3.5-turbo",
      prompt: this.userInput,
      // organization_id:'org-HDc8I811J5cuJN60feR56Gym',
      // temperature: 0.5,
      max_tokens:50
    }, config)
    .then((response) =>{
      console.log('here is the response:', response);
    })
    .catch(function (error) {
      console.log('errorrs ndo izi:', error);
    });
    // console.log(this.userInput);
    if (this.userInput.trim() !== '') {
      this.messages.push({ content: this.userInput, sender: 'user' });
      // Handle AI response here (for simplicity, let's assume an immediate response)
      this.messages.push({ content: 'wewe ni mjinga', sender: 'assistant' });
      this.userInput = '';
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
