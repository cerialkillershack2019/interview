import { InterviewQuestionAnswerChange, InterviewQuestion } from '../data/interview.model'

export enum InterviewActionType {
  FETCH_QUESTIONS = '[I] fetch questions action',
  UPDATE_QUESTIONS = '[I] update questions action',
  UPDATE_ANSWER = '[I] update answers action',
}

export type FetchInterviewQuestionsAction = { type: InterviewActionType.FETCH_QUESTIONS }
export type UpdateInterviewQuestionsAction = { type: InterviewActionType.UPDATE_QUESTIONS, questions: InterviewQuestion[] }
export type UpdateInterviewAnswersAction = { type: InterviewActionType.UPDATE_ANSWER } & InterviewQuestionAnswerChange

export type InterviewAction = null
  | UpdateInterviewQuestionsAction
  | UpdateInterviewAnswersAction
