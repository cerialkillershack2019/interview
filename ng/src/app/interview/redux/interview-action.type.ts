import { InterviewPlayerAnswersSummary, InterviewQuestion, InterviewQuestionAnswerChange } from '../data/interview.model'

export enum InterviewActionType {
  FETCH_QUESTIONS = '[I] fetch questions action',
  UPDATE_QUESTIONS = '[I] update questions action',
  UPDATE_NAME = '[I] update name action',
  UPDATE_ANSWER = '[I] update answer action',
  UPDATE_PLAYERS_ANSWERS_SUMMARY = '[I] update players answers summary action',
}

export type FetchInterviewQuestionsAction = { type: InterviewActionType.FETCH_QUESTIONS }
export type UpdateInterviewQuestionsAction = { type: InterviewActionType.UPDATE_QUESTIONS, questions: InterviewQuestion[] }
export type UpdateInterviewNameAction = { type: InterviewActionType.UPDATE_NAME, name: string }
export type UpdateInterviewAnswerAction = { type: InterviewActionType.UPDATE_ANSWER } & InterviewQuestionAnswerChange
export type UpdateInterviewPlayersAnswersSummaryAction = { type: InterviewActionType.UPDATE_PLAYERS_ANSWERS_SUMMARY, playersAnswersSummary: InterviewPlayerAnswersSummary[] }

export type InterviewAction = null
  | UpdateInterviewQuestionsAction
  | UpdateInterviewNameAction
  | UpdateInterviewAnswerAction
  | UpdateInterviewPlayersAnswersSummaryAction
