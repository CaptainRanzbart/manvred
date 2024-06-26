import { Component, ViewChild, inject } from '@angular/core';
import { Examination } from 'src/app/shared/models/Examination';
import { ApiService } from 'src/app/shared/services/api.service';


@Component({
  selector: 'app-examinations-list',
  templateUrl: './examinations-list.page.html',
  styleUrls: ['./examinations-list.page.scss'],
})
export class ExaminationsListPage {

  private _apiServ = inject(ApiService)
  public examinations!: Examination[];

  constructor() {
    this.queryExaminations();
  }

  async queryExaminations() {
    this.examinations = await this._apiServ.getExaminations();
    console.log(this.examinations)
  }
}
