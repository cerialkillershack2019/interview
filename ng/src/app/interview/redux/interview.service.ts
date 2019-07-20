import { Injectable } from '@angular/core'

import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'

import { InterviewAnswer, InterviewPlayerAnswersSummary, InterviewQuestion, InterviewQuestionAnswerChange, InterviewState } from '../data/interview.model'
import { InterviewActionType } from './interview-action.type'

@Injectable()
export class InterviewService {

  constructor(private store: Store<{ interview: InterviewState }>) {
  }

  selectQuestions(): Observable<InterviewQuestion[]> {
    return this.store.pipe(select(s => s.interview.questions))
  }

  selectName(): Observable<string> {
    return this.store.pipe(select(s => s.interview.name))
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

  selectPlayersAnswersSummary(): Observable<InterviewPlayerAnswersSummary[]> {
    return this.store.pipe(select(s => s.interview.playersAnswersSummary))
  }

  updateName(name: string): void {
    this.store.dispatch({type: InterviewActionType.UPDATE_NAME, name})
  }

  updateAnswer(change: InterviewQuestionAnswerChange): void {
    this.store.dispatch({type: InterviewActionType.UPDATE_ANSWER, ...change})
  }

}
