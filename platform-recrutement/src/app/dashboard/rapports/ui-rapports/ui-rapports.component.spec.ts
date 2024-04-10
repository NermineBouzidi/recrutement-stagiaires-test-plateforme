import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiRapportsComponent } from './ui-rapports.component';

describe('UiRapportsComponent', () => {
  let component: UiRapportsComponent;
  let fixture: ComponentFixture<UiRapportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiRapportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiRapportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
