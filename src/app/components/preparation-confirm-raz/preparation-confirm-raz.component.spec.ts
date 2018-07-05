import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparationConfirmRazComponent } from './preparation-confirm-raz.component';

describe('PreparationConfirmRazComponent', () => {
  let component: PreparationConfirmRazComponent;
  let fixture: ComponentFixture<PreparationConfirmRazComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreparationConfirmRazComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreparationConfirmRazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
