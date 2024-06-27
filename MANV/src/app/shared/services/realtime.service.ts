import { Injectable, inject } from "@angular/core";
import { WebSocketClient } from "@directus/sdk";
import { DirectusService } from "./directus.service";
import { NavController } from "@ionic/angular";
import { Observable, fromEvent } from "rxjs";

@Injectable({
  providedIn : 'root'
})
export class RealTimeService {
  private _directusService = inject(DirectusService)

  private webSocketClient: WebSocketClient<any>;

  public opened!: Observable<any>;
  public closed!: Observable<any>;
  public failed!: Observable<any>;
  public recieved!: Observable<any>;

  constructor() {
    this.webSocketClient = <WebSocketClient<any>>((<unknown>this._directusService.getClient()));
    
    this.connectClient();
  }

  private async connectClient() {
    await this.webSocketClient.connect();
  }

  public async subscribe(relation: string){
    try {
      console.log("real")
      await this.webSocketClient.subscribe(relation, {"query": { "fields": ["*.*.*.*"] }});
      this.webSocketClient.onWebSocket('message', (event) => {
        console.log(event)
      })

      // this.opened = this.open();
      // this.closed = this.close();
      // this.failed = this.error();
      // this.recieved = this.message();
    } catch (error) {
      console.log(error);
    }
  }

  private open(): Observable<any> {
    return new Observable(observer => { this.webSocketClient.onWebSocket('open', (event) => { observer.next(event); })});
  }

  private close(): Observable<any> {
    return new Observable(observer => { this.webSocketClient.onWebSocket('close', (event) => { observer.next(event); })});
  }

  private error(): Observable<any> {
    return new Observable(observer => { this.webSocketClient.onWebSocket('error', (event) => { observer.next(event); })});
  }

  private message(): Observable<any> {
    return new Observable;
    return new Observable(observer => { this.webSocketClient.onWebSocket('message', (event) => { observer.next(event); })});
  }
}