import { Component, OnInit, inject } from '@angular/core';
import { ExaminationResult } from 'src/app/shared/models/ExaminationResult';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-examination-detail',
  templateUrl: './examination-detail.page.html',
  styleUrls: ['./examination-detail.page.scss'],
})
export class ExaminationDetailPage implements OnInit {
  
  private _examinationResultId!: string | null;
  public examinationResult!: ExaminationResult;

  private _apiServ = inject(ApiService)
  
  constructor(private route: ActivatedRoute) { }

  async ngOnInit() {
    this._examinationResultId = this.route.snapshot.paramMap.get('id')
    
    if (this._examinationResultId) {
      this.examinationResult = await this._apiServ.getExaminationResult(this._examinationResultId)
    }
  }

  
}
