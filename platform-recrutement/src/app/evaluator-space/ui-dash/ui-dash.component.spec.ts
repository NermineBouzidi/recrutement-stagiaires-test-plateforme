import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiDashComponent } from './ui-dash.component';

describe('UiDashComponent', () => {
  let component: UiDashComponent;
  let fixture: ComponentFixture<UiDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiDashComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
