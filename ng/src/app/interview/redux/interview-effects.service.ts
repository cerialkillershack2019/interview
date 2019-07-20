import { Injectable } from '@angular/core'
import { RoutesRecognized } from '@angular/router'

import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators'

import { AppRouterStateUrl } from '../../core/routing/app-router-state-serializer.service'
import { InterviewPlayerAnswersSummary, InterviewQuestionCategory, InterviewQuestionDifficulty, InterviewQuestionType } from '../data/interview.model'
import { FetchInterviewQuestionsAction, InterviewActionType, UpdateInterviewAnswerAction } from './interview-action.type'
import { InterviewService } from './interview.service'
import { InterviewDataServiceImpl } from '../data/interview.data.service.impl'
import { SocketService } from '../../common/services/socket.service'

@Injectable()
export class InterviewEffectsService {

  constructor(private actions$: Actions,
              private interviewService: InterviewService,
              private interviewDataService: InterviewDataServiceImpl,
              private socketService: SocketService) {
  }

  @Effect()
  routeEnter$ = this.actions$.pipe(
    ofType<RouterNavigationAction<AppRouterStateUrl>>(ROUTER_NAVIGATION),
    map(({payload}) => payload),
    filter(({event, routerState}) => event instanceof RoutesRecognized && routerState.data.interview),
    map(() => ({type: InterviewActionType.FETCH_QUESTIONS}))
  )

  @Effect()
  fetchQuestions$ = this.actions$.pipe(
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

  @Effect({dispatch: false})
  updateAnswersSummary$ = this.actions$.pipe(
    ofType<UpdateInterviewAnswerAction>(InterviewActionType.UPDATE_ANSWER),
    withLatestFrom(
      this.interviewService.selectName(),
      this.interviewService.selectAnswersSummary()
    ),
    map(([_, name, answersSummary]) => ({name, answersSummary})),
    tap(eventData => this.socketService.sendEventData<InterviewPlayerAnswersSummary>('interview_attached', eventData)),
    catchError(error => of({type: null, error}))
  )

  @Effect()
  fetchPlayersAnswersSummary$ = this.actions$.pipe(
    ofType<FetchInterviewQuestionsAction>(InterviewActionType.FETCH_QUESTIONS),
    switchMap(() => this.socketService.receiveEventData('interview_candidates').pipe(
      map(playersAnswersSummary => ({type: InterviewActionType.UPDATE_PLAYERS_ANSWERS_SUMMARY, playersAnswersSummary})),
      catchError(error => of({type: null, error}))
    ))
  )

}
