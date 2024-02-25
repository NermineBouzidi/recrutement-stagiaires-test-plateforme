import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCodeComponent } from './user-code.component';

describe('UserCodeComponent', () => {
  let component: UserCodeComponent;
  let fixture: ComponentFixture<UserCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
