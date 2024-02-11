import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UidashboardComponent } from './uidashboard.component';

describe('UidashboardComponent', () => {
  let component: UidashboardComponent;
  let fixture: ComponentFixture<UidashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UidashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UidashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
