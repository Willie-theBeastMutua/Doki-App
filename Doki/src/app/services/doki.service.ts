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

  // Promise<AxiosResponse<any, any>>
  async getDokiResponse(): Promise<string> {
    // set configuration 
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // 'Authorization': `Bearer ${environment.openAiapiKey}`,
    //   }

    // };
    // return the API response
    try {
      // Send a POST request to the server using Axios
      const response: AxiosResponse<{ result: string }> = await axios.post('http://127.0.0.1:5000/query', {
        question: this.myData,
      });
      // console.log(response.data.result)
      return response.data.result;
    } catch (error) {
      console.log("error:", error);
      return 'An error occurred.';
    }




    //   axios.post(environment.openAiBaseURL, {
    //     question: this.myData})
    //     .then((response) => {
    //       // console.log(response.data.result);
    //       return response.data.result;
    //     })
    //     .catch((error) => {
    //       console.log('errorrs ndo izi:', error);
    //       throw error;
    //     });
  }

}

