import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcarsComponent } from './allcars.component';

describe('AllcarsComponent', () => {
  let component: AllcarsComponent;
  let fixture: ComponentFixture<AllcarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllcarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllcarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
