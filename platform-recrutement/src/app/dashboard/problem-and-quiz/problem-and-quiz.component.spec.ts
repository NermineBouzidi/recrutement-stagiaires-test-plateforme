import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemAndQuizComponent } from './problem-and-quiz.component';

describe('ProblemAndQuizComponent', () => {
  let component: ProblemAndQuizComponent;
  let fixture: ComponentFixture<ProblemAndQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProblemAndQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemAndQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
