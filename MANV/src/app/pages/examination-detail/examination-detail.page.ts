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
  
  private _examinationResultId!: string | null;
  public examinationResult!: ExaminationResult;
  public examination!: Examination;

  private _apiServ = inject(ApiService)
  private _route = inject(ActivatedRoute)

  constructor() { }

  async ngOnInit() {
    this._examinationResultId = this._route.snapshot.paramMap.get('id')
    
    if (this._examinationResultId) {
      const examinationQuery = { fields: ['*.*.*.*.*'], ExaminationResult: this._examinationResultId, limit: 1}
      this.examinationResult = await this._apiServ.getExaminationResult(this._examinationResultId)
      const examinations = await this._apiServ.getExaminations()
      this.examination = examinations[0]
      console.log(this.examination)
    }
  }

  
}
