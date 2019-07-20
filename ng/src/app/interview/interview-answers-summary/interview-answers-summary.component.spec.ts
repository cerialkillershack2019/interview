import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewAnswersSummaryComponent } from './interview-answers-summary.component';

describe('InterviewAnswersSummaryComponent', () => {
  let component: InterviewAnswersSummaryComponent;
  let fixture: ComponentFixture<InterviewAnswersSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewAnswersSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewAnswersSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
