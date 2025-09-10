import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmsApiComponent } from './rms-api.component';

describe('RmsApiComponent', () => {
  let component: RmsApiComponent;
  let fixture: ComponentFixture<RmsApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RmsApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RmsApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
