import { Injectable } from '@angular/core'
import { RoutesRecognized } from '@angular/router'

import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators'

import { AppRouterStateUrl } from '../../core/routing/app-router-state-serializer.service'
import { FetchUserDataAction, UserActionType } from './user-action.type'
import { UserService } from './user.service'
import { UserDataService } from '../data/user.data.service'

@Injectable()
export class UserEffectsService {

  constructor(private actions$: Actions,
              private userService: UserService,
              private userDataService: UserDataService) {
  }

  @Effect()
  routeEnter$ = this.actions$.pipe(
    ofType<RouterNavigationAction<AppRouterStateUrl>>(ROUTER_NAVIGATION),
    map(({payload}) => payload),
    filter(({event}) => event instanceof RoutesRecognized),
    map(({routerState}) => ({userContext: routerState.data.userContext})),
    withLatestFrom(this.userService.selectUserData()),
    filter(([{userContext}, userData]) => userContext && !userData),
    mergeMap(() => of({type: UserActionType.FETCH_USER_DATA}, {type: UserActionType.FETCH_USER_UID_DATA}))
  )

  @Effect()
  fetchUserData$ = this.actions$.pipe(
    ofType<FetchUserDataAction>(UserActionType.FETCH_USER_DATA),
    switchMap(() => this.userDataService.fetchUserData().pipe(
      map(userData => ({type: UserActionType.UPDATE_USER_DATA, userData})),
      catchError(error => of({type: null, error}))
    ))
  )

  @Effect()
  fetchUserUidData$ = this.actions$.pipe(
    ofType<FetchUserDataAction>(UserActionType.FETCH_USER_UID_DATA),
    switchMap(() => this.userDataService.fetchUserUidData().pipe(
      map(uidData => ({type: UserActionType.UPDATE_USER_UID_DATA, uidData})),
      catchError(error => of({type: null, error}))
    ))
  )

}
