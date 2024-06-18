import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExaminationsListPage } from './examinations-list.page';

describe('ExaminationsListPage', () => {
  let component: ExaminationsListPage;
  let fixture: ComponentFixture<ExaminationsListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ExaminationsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
