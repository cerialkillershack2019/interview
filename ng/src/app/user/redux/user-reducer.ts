import { UserState } from '../data/user.model'
import { UserAction, UserActionType } from './user-action.type'

export const initialState: UserState = {
  userData: null,
}

export function userReducer(state: UserState = initialState, action?: UserAction): UserState {
  if (!action) {
    return state
  }
  switch (action.type) {
    case UserActionType.UPDATE_USER_DATA: {
      return {...state, userData: action.userData}
    }
    case UserActionType.UPDATE_USER_UID_DATA: {
      return {...state, uidData: action.uidData}
    }
    default: {
      return state
    }
  }
}
