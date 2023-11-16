import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  messages: { content: string; sender: 'user' | 'assistant' }[] = [
    { content: 'Hello!', sender: 'assistant' },
    { content: 'Hi there!', sender: 'assistant' },
    { content: 'How can I help you today?', sender: 'assistant' },
  ];

  userInput: string = '';

  sendMessage() {
    const apiKey = 'sk-YNAKvHjME0sKa0H9pwd9T3BlbkFJLnNWYnIyvITebB3GPVLsk-YT4c26L4QGzp5nC0nCZrT3BlbkFJu3WnNkhKZ5tOzHIKODzG';
    const config = {
      headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,}
      
    };
    console.log('Request Headers:', config.headers);
    axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: this.userInput,
      // temperature: 0.5,
      max_tokens:100
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
