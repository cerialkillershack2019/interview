import { InterviewState } from '../data/interview.model'
import { InterviewAction, InterviewActionType } from './interview-action.type'

export const initialState: InterviewState = {
  uid: null,
  name: null,
  questions: null,
  questionAnswers: null,
  answersSummary: null,
  playersAnswersSummary: null
}

export function interviewReducer(state: InterviewState = initialState, action?: InterviewAction): InterviewState {
  if (!action) {
    return state
  }
  switch (action.type) {
    case InterviewActionType.UPDATE_QUESTIONS: {
      return {...state, questions: action.questions}
    }
    case InterviewActionType.UPDATE_ANSWER: {
      const questionAnswers = (state.questionAnswers || []).slice()
      const index = state.questions.findIndex((_, i) => i === action.questionAnswer.id)
      const question = state.questions[index]
      const answersSummary = (state.answersSummary || []).slice()
      questionAnswers[index] = action.questionAnswer
      answersSummary[index] = {id: index, correct: question.correct_answer === action.questionAnswer.answer}
      const playersAnswersSummary = [...(state.playersAnswersSummary || []), {name: 'sdsd', answersSummary}] // TODO
      return {...state, questionAnswers, answersSummary, playersAnswersSummary}
    }
    default: {
      return state
    }
  }
}
