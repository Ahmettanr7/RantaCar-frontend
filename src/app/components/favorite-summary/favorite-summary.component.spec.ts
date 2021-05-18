import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteSummaryComponent } from './favorite-summary.component';

describe('FavoriteSummaryComponent', () => {
  let component: FavoriteSummaryComponent;
  let fixture: ComponentFixture<FavoriteSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
