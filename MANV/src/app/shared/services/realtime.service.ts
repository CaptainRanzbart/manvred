import { Injectable, inject } from "@angular/core";
import { WebSocketClient } from "@directus/sdk";
import { DirectusService } from "./directus.service";
import { NavController } from "@ionic/angular";
import { Observable, Subject, Subscription } from "rxjs";

@Injectable({
  providedIn : 'root'
})
export class RealTimeService {
  private _directusService = inject(DirectusService)

  private webSocketClient: WebSocketClient<any>;

  constructor() {
    this.webSocketClient = <WebSocketClient<any>>((<unknown>this._directusService.getClient()));
    
    this.connectClient();
  }

  private async connectClient() {
    await this.webSocketClient.connect();
  }

  public async createObservable(relation: string): Promise<Observable<any>> {
    try {
      const { subscription } = await this.webSocketClient.subscribe(relation, {"query": { "fields": ["*.*.*.*"] }});
      
      return new Observable<any>(observer => {(async () => {for await (const value of subscription) {observer.next(value);}})();});

    } catch (error) {
      console.log(error);
      return new Observable()
    }
  }
}