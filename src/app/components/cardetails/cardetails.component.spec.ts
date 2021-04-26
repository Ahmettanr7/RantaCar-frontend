import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardetailsComponent } from './cardetails.component';

describe('CardetailsComponent', () => {
  let component: CardetailsComponent;
  let fixture: ComponentFixture<CardetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
