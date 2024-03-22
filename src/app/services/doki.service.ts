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

  async getDokiResponse(): Promise<string> {

    // return the API response
    try {
      // Send a POST request to the server using Axios
      const response: AxiosResponse<{ result: string }> = await axios.post('https://dreams-dev.healthstrat.co.ke:6007/query', {
        // https://dreams-dev.healthstrat.co.ke:6007
        
        question: this.myData,
      });
      // console.log(response.data.result)
      return response.data.result;
    } catch (error) {
      console.log("error:", error);
      return 'An error occurred.';
    }

  }

}

