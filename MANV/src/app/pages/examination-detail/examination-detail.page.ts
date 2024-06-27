import { Component, OnInit, inject } from '@angular/core';
import { ExaminationResult } from 'src/app/shared/models/ExaminationResult';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { Examination } from 'src/app/shared/models/Examination';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-examination-detail',
  templateUrl: './examination-detail.page.html',
  styleUrls: ['./examination-detail.page.scss'],
})
export class ExaminationDetailPage implements OnInit {
  private _examinationId!: string | null;
  public examination: Examination | undefined;

  private _apiServ = inject(ApiService);
  private _route = inject(ActivatedRoute);

  constructor() {}

  async ngOnInit() {
    this._examinationId = this._route.snapshot.paramMap.get('id');

    if (this._examinationId) {
      const examinations: Examination[] = await this._apiServ.getExaminations();
      this.examination = examinations.filter((examination) => {
        return this._examinationId === examination.id;
      })[0];
    }
  }
}
