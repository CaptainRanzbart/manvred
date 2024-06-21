import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Examination } from 'src/app/shared/models/Examination';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-examinations-list',
  templateUrl: './examinations-list.page.html',
  styleUrls: ['./examinations-list.page.scss'],
})
export class ExaminationsListPage {
  @ViewChild(IonModal, { static: true }) modal!: IonModal;

  message = 'Untersuchung:';
  examination: Examination | undefined;
  examinations: Examination[] = [];

  constructor(private apiServ: ApiService) {
    this.loadNames();
  }
  async loadNames() {
    this.examinations = await this.apiServ.getExaminations();
    console.table(this.examinations);
  }
}
