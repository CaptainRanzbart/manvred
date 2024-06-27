import { Component, Input, OnInit } from '@angular/core';
import { Examination } from 'src/app/shared/models/Examination';

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.scss'],
})
export class ExaminationComponent implements OnInit {
  @Input() examination!: Examination;

  private _duration!: number;
  private _startTime: Date = new Date();
  private _endTime: Date = new Date();
  private _interval!: any;

  public remainingTime!: number;
  public progress!: number;

  constructor() {}

  ngOnInit() {
    this._duration = this.examination.Device?.Duration as number;
    this._startTime = new Date(this.examination.StartTime + 'Z');
    this._endTime.setTime(this._startTime.getTime() + this._duration * 1000);

    this._interval = setInterval(() => {
      this.calculateProgress();
    }, 100);
  }

  private calculateProgress() {
    const currentDate = new Date();
    const remainingTime =
      (this._endTime.getTime() - currentDate.getTime()) / 1000;

    if (remainingTime <= 0) clearInterval(this._interval);

    this.remainingTime = remainingTime;

    const progress = 1 - this.remainingTime / this._duration;
    this.progress = progress;
  }
}
