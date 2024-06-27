import { Component, ViewChild, inject } from '@angular/core';
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
  public subs: Subscription = new Subscription();

  constructor() { 
  }

  async ngOnInit() {
    await this._realTime.subscribe("Examination");

    this.subs.add(this._realTime.recieved.subscribe((event) => {
      switch (event.event) {
        case "create":
            console.log(this.examinations.filter((elem) => { elem.id === event.data[0].id}))
            console.log("Created")
            console.table(event)
          break;
        case "delete":
          console.log("Deleted")
          console.table(event)
          break;
        default:
           this.examinations = event.data;
          break;
      }
    }))
  }

  // async queryExaminations() {
  //   this.examinations = await this._apiServ.getExaminations();
  // }
}
