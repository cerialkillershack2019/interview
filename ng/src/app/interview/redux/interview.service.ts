import { Injectable } from '@angular/core'

import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { InterviewAnswer, InterviewPlayersAnswersSummary, InterviewQuestion, InterviewQuestionAnswerChange, InterviewState } from '../data/interview.model'
import { InterviewActionType } from './interview-action.type'

@Injectable()
export class InterviewService {

  constructor(private store: Store<{ interview: InterviewState }>) {
  }

  selectQuestions(): Observable<InterviewQuestion[]> {
    return this.store.pipe(select(s => s.interview.questions))
  }

  selectIsAnswersSummary(): Observable<boolean> {
    return this.store.pipe(select(s => !!s.interview.answersSummary))
  }

  selectIsPlayersAnswersSummary(): Observable<boolean> {
    return this.store.pipe(select(s => !!s.interview.playersAnswersSummary))
  }

  selectAnswersSummary(): Observable<InterviewAnswer[]> {
    return this.store.pipe(select(s => s.interview.answersSummary))
  }

  selectPlayersAnswersSummary(): Observable<InterviewPlayersAnswersSummary[]> {
    return this.store.pipe(select(s => s.interview.playersAnswersSummary))
  }

  updateAnswer(change: InterviewQuestionAnswerChange): void {
    this.store.dispatch({type: InterviewActionType.UPDATE_ANSWER, ...change})
  }

}
