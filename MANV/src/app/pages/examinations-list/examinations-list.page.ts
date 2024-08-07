import { Component, ViewChild, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Examination } from 'src/app/shared/models/Examination';
import { ApiService } from 'src/app/shared/services/api.service';
import { RealTimeService } from 'src/app/shared/services/realtime.service';

/**
 * Page component to display and manage a list of examinations.
 * 
 * This component fetches and maintains a real-time list of examinations. It uses 
 * `ApiService` to fetch examination data and `RealTimeService` to subscribe to 
 * real-time updates for create, update, and delete events on examinations.
 */

@Component({
  selector: 'app-examinations-list',
  templateUrl: './examinations-list.page.html',
  styleUrls: ['./examinations-list.page.scss'],
})
export class ExaminationsListPage {
  private _realTime = inject(RealTimeService);
  public examinations!: Examination[];

  public subs: Subscription = new Subscription();

  constructor() {
  }

  async ngOnInit() {
    (await this._realTime.createObservable("Examination")).subscribe((event) => {
      switch (event.event) {
        case "create":
          if (this.examinations.some(exam => exam.id === event.data[0].id)) break;
          const itemsToInsert: Set<Examination> = new Set(event.data);
          this.examinations.push(...itemsToInsert);
          this.examinations = Array.from(new Set<Examination>(this.examinations));
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
