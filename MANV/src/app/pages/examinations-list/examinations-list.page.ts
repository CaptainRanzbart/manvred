import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Examination } from 'src/app/shared/models/Examination';
import { ApiService } from 'src/app/shared/services/api.service';
import { RealTimeService } from 'src/app/shared/services/realtime.service';


@Component({
  selector: 'app-examinations-list',
  templateUrl: './examinations-list.page.html',
  styleUrls: ['./examinations-list.page.scss'],
})
export class ExaminationsListPage {

  private _apiServ = inject(ApiService);
  private _realTime = inject(RealTimeService);
  public examinations!: Examination[];

  private subscription!: Subscription;

  public subs: Subscription = new Subscription();

  constructor() {
  }

  async ngOnInit() {
    (await this._realTime.createObservable("Examination")).subscribe((event) => {
      switch (event.event) {
        case "create":
          const itemsToInsert: Set<Examination> = new Set(event.data)
          this.examinations.push(...itemsToInsert)
          break;
        case "update":
          this.examinations = this.examinations.map((elem) => {
            const matchedItem = event.data.find((eventItem: { id: string; }) => eventItem.id === elem.id);
            if (matchedItem) return matchedItem;
            else return elem;
          })
          break;
        case "delete":
          this.examinations = this.examinations.filter((elem) => { return !event.data.includes(elem.id); });
          break;
        default:
           this.examinations = event.data;
          break;
      }
    })
  }
}
