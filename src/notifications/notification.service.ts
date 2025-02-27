import { NotificationI } from "./notification.abstract";
import { BadGatewayException,  Injectable, MethodNotAllowedException } from "@nestjs/common";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { ConfigService } from "@nestjs/config";
import { NOTIFICATION_API_BODY_TYPE } from "../types/notification.dto.type";

@Injectable()
export class NotificationService implements NotificationI {

  private readonly METHOD_LIST: string[] = ['GET', 'POST'];
  private readonly NOTIFICATION_API_URL: string = this.config.get("NOTIFICATION_API_URL")
  private readonly SEND_2FA_PATH: string = this.config.get("SEND_2FA_PATH")
  private readonly SEND_ERROR_PATH: string = this.config.get("SEND_ERROR_PATH")
  private readonly ACCESS_KEY_HEADER: string = this.config.get("API_ACCESS_KEY")

  constructor(private readonly config: ConfigService) {}

  async sendCustomerMessage(payload: NOTIFICATION_API_BODY_TYPE): Promise<void> {
    await this.sendNotification(this.SEND_2FA_PATH, "POST", payload)
  }

  async sendError(msg: string): Promise<void> {
    await this.sendNotification(`${this.SEND_ERROR_PATH}/${msg}/`, "GET")
  }


  // ########################################################################################################
  // ##################################### private methods area #############################################
  // ########################################################################################################


  private async sendNotification(route: string, method: string, payload?: NOTIFICATION_API_BODY_TYPE): Promise<void> {
    await this.validateMethod(method) // throw an error 

    const path: string = `${this.NOTIFICATION_API_URL}${route}`

    const headers = {
      'Access-Control-Allow-Origin': `${this.NOTIFICATION_API_URL}`,
      'accesskey': this.ACCESS_KEY_HEADER,
      'Access-Control-Allow-Credentials': 'true',
      'Content-Type': 'application/json'
    }

    let opts: AxiosRequestConfig = {
      method: method,
      responseType: 'json',
      headers: headers,
      withCredentials: true
    };

    if(payload) opts.data = payload
  
    // console.log('headers => ', headers)
    // console.log('path +> : ', path)
    // console.log('opts +> : ', opts)
    // const handleResponse = (response: AxiosResponse) => ( response.data )
  
    const handleResponse = (response: AxiosResponse) => {
      console.log(response.data.data)
    }
  
    const handleError = (error: AxiosError) => {
      console.log(error.code)
      throw new BadGatewayException()
    }
  
    return await axios(path, opts)
      .then(handleResponse)
      .catch(handleError)
  }

  private async validateMethod(m: string): Promise<void> {
    for (let i: number = 0; i < this.METHOD_LIST.length; i++)
      if ( m === this.METHOD_LIST[i] ) return

    throw new MethodNotAllowedException("Received method not allowed (notification app*)")
  }

}