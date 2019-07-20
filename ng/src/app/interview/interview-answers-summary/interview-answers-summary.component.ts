import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

import { InterviewAnswer } from '../data/interview.model'

@Component({
  selector: 'koj-interview-answers-summary',
  templateUrl: './interview-answers-summary.component.html',
  styleUrls: ['./interview-answers-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterviewAnswersSummaryComponent {

  @Input() answersSummary: InterviewAnswer[]

  trackByFn(_: number, question: InterviewAnswer): number {
    return question && question.id
  }

}
