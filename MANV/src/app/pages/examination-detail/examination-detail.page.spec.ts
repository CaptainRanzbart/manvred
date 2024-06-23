import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExaminationDetailPage } from './examination-detail.page';

describe('ExaminationDetailPage', () => {
  let component: ExaminationDetailPage;
  let fixture: ComponentFixture<ExaminationDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExaminationDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
