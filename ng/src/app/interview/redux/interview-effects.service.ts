import { Injectable } from '@angular/core'
import { RoutesRecognized } from '@angular/router'

import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, filter, map, switchMap } from 'rxjs/operators'

import { AppRouterStateUrl } from '../../core/routing/app-router-state-serializer.service'
import { InterviewQuestionCategory, InterviewQuestionDifficulty, InterviewQuestionType } from '../data/interview.model'
import { FetchInterviewQuestionsAction, InterviewActionType } from './interview-action.type'
import { InterviewDataServiceImpl } from '../data/interview.data.service.impl'

@Injectable()
export class InterviewEffectsService {

  constructor(private actions$: Actions,
              private interviewDataService: InterviewDataServiceImpl) {
  }

  @Effect()
  routeEnter$ = this.actions$.pipe(
    ofType<RouterNavigationAction<AppRouterStateUrl>>(ROUTER_NAVIGATION),
    map(({payload}) => payload),
    filter(({event, routerState}) => event instanceof RoutesRecognized && routerState.data.interview),
    map(() => ({type: InterviewActionType.FETCH_QUESTIONS}))
  )

  @Effect()
  fetchQuestionsData$ = this.actions$.pipe(
    ofType<FetchInterviewQuestionsAction>(InterviewActionType.FETCH_QUESTIONS),
    switchMap(() => this.interviewDataService.fetchQuestions({
      amount: 10,
      category: InterviewQuestionCategory.SCIENCE_COMPUTERS,
      type: InterviewQuestionType.BOOLEAN,
      difficulty: InterviewQuestionDifficulty.EASY
    }).pipe(
      map(({results}) => ({type: InterviewActionType.UPDATE_QUESTIONS, questions: results})),
      catchError(error => of({type: null, error}))
    ))
  )

}
