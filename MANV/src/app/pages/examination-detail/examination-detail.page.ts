import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { Examination } from 'src/app/shared/models/Examination';
import { environment } from 'src/environments/environment';
import { DirectusService } from 'src/app/shared/services/directus.service';

/**
 * Page component to display the details of a specific examination.
 * 
 * This component fetches and displays detailed information about an examination
 * based on the examination ID provided in the route parameters. It uses `ApiService`
 * to fetch examination data and `DirectusService` for additional data handling.
 */

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

  constructor() { }

  async ngOnInit() {
    this._examinationId = this._route.snapshot.paramMap.get('id');

    if (this._examinationId) {
      const examinations: Examination = await this._apiServ.getExamination(this._examinationId);
      this.examination = examinations
    }
  }

  public getImageUrl(): string | null {
    const imageId = this.examination?.ExaminationResult?.Image?.id
    if (imageId) return environment.baseApiUrl + 'assets/' + this.examination?.ExaminationResult?.Image?.id
    return null;
  }
}
