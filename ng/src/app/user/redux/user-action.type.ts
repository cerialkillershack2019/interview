import { UserData } from '../data/user.model'

export enum UserActionType {
  FETCH_USER_DATA = '[USER] fetch user data action',
  FETCH_USER_UID_DATA = '[USER] fetch user uid data action',
  UPDATE_USER_DATA = '[USER] update user data action',
  UPDATE_USER_UID_DATA = '[USER] update user uid data action',
}

export type FetchUserDataAction = { type: UserActionType.FETCH_USER_DATA }
export type FetchUserUidDataAction = { type: UserActionType.UPDATE_USER_DATA }
export type UpdateUserDataAction = { type: UserActionType.UPDATE_USER_DATA, userData: UserData }
export type UpdateUserUidDataAction = { type: UserActionType.UPDATE_USER_UID_DATA, uidData: string }

export type UserAction = null
  | UpdateUserDataAction
  | UpdateUserUidDataAction
