import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuizTrueFalseComponent } from './add-quiz-true-false.component';

describe('AddQuizTrueFalseComponent', () => {
  let component: AddQuizTrueFalseComponent;
  let fixture: ComponentFixture<AddQuizTrueFalseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuizTrueFalseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuizTrueFalseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
