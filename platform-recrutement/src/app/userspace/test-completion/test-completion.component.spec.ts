import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCompletionComponent } from './test-completion.component';

describe('TestCompletionComponent', () => {
  let component: TestCompletionComponent;
  let fixture: ComponentFixture<TestCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestCompletionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
