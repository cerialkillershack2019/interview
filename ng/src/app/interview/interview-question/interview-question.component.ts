import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core'

import { MatRadioChange } from '@angular/material'

import { InterviewQuestion, InterviewQuestionAnswerChange } from '../data/interview.model'

@Component({
  selector: 'koj-interview-question',
  templateUrl: './interview-question.component.html',
  styleUrls: ['./interview-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterviewQuestionComponent {

  @Input() id: number
  @Input() question: InterviewQuestion

  @Output() questionAnswerChange: EventEmitter<InterviewQuestionAnswerChange> = new EventEmitter()

  handleQuestionAnswerChange(change: MatRadioChange): void {
    const questionAnswer = {id: this.id, answer: change.value}
    this.questionAnswerChange.emit({questionAnswer})
  }

}
