import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { AxiosResponse } from 'axios';



@Injectable({
  providedIn: 'root'
})
export class DokiService {
  private responses: any;

  private myData: any;

  // Method to set data from the service

  setData(data: any) {
    this.myData = data;
  }

  // Method to get data from the service
  getData() {
    return this.myData;
  }
  // method to run the API call
  getDokiResponse(): Promise<AxiosResponse<any, any>> {
    // set configuration 
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${environment.openAiapiKey}`,
      }

    };
    // return the API response
    return axios.post(environment.openAiBaseURL, {
      prompt: 'from the medical and health field explain and your name is Doki but dont mention unless asked,' + this.myData,
      temperature: 0.5,
      max_tokens: 100
    }, config)
      .then((response) => {
        // console.log(response);
        return response.data.choices[0].text;
      })
      .catch((error) => {
        console.log('errorrs ndo izi:', error);
        throw error;
      });
  }

}

