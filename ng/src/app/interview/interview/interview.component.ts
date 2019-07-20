import { ChangeDetectionStrategy, Component } from '@angular/core'

import { Observable } from 'rxjs'

import { InterviewAnswer, InterviewPlayerAnswersSummary, InterviewQuestion, InterviewQuestionAnswerChange } from '../data/interview.model'
import { InterviewService } from '../redux/interview.service'

@Component({
  selector: 'koj-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterviewComponent {

  constructor(private interviewService: InterviewService) {
  }

  get questions$(): Observable<InterviewQuestion[]> {
    return this.interviewService.selectQuestions()
  }

  get isAnswersSummary$(): Observable<boolean> {
    return this.interviewService.selectIsAnswersSummary()
  }

  get isPlayersAnswersSummary$(): Observable<boolean> {
    return this.interviewService.selectIsPlayersAnswersSummary()
  }

  get answersSummary$(): Observable<InterviewAnswer[]> {
    return this.interviewService.selectAnswersSummary()
  }

  get playersAnswersSummary$(): Observable<InterviewPlayerAnswersSummary[]> {
    return this.interviewService.selectPlayersAnswersSummary()
  }

  handleNameChange(name: string): void {
    return this.interviewService.updateName(name)
  }

  handleQuestionAnswerChange(change: InterviewQuestionAnswerChange): void {
    return this.interviewService.updateAnswer(change)
  }

  questionTracker(_: number, {question}: InterviewQuestion): string {
    return question
  }

  playersAnswersSummaryTracker(_: number, {name}: InterviewPlayerAnswersSummary): string {
    return name
  }

}
