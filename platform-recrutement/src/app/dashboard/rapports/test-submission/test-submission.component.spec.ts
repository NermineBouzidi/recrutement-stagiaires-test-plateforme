import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSubmissionComponent } from './test-submission.component';

describe('TestSubmissionComponent', () => {
  let component: TestSubmissionComponent;
  let fixture: ComponentFixture<TestSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestSubmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
