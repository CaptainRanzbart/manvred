import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { Examination } from 'src/app/shared/models/Examination';
import { environment } from 'src/environments/environment';
import { DirectusService } from 'src/app/shared/services/directus.service';
import { readAssetRaw } from '@directus/sdk';

@Component({
  selector: 'app-examination-detail',
  templateUrl: './examination-detail.page.html',
  styleUrls: ['./examination-detail.page.scss'],
})
export class ExaminationDetailPage implements OnInit {
  private _examinationId!: string | null;
  public examination: Examination | undefined;
  
  private _apiServ = inject(ApiService);
  private _directusService = inject(DirectusService)
  private _route = inject(ActivatedRoute);

  public baseUrl = environment.baseApiUrl;
  constructor() {}

  async ngOnInit() {
    this._examinationId = this._route.snapshot.paramMap.get('id');

    if (this._examinationId) {
      const examinations: Examination = await this._apiServ.getExamination(this._examinationId);
      this.examination = examinations
      //this.getImage();
      console.log(this.examination)
    }
  }
  
  // private async getImage() {
  //   console.log(await this._apiServ.restClient.request(readAssetRaw(this.examination?.ExaminationResult?.Image?.id as string)))
  // }
}
