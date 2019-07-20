export interface InterviewState {
  uid: string
  name: string
  questions: InterviewQuestion[]
  questionAnswers: InterviewQuestionAnswer[]
  answersSummary: InterviewAnswer[]
  playersAnswersSummary: InterviewPlayersAnswersSummary[]
}

export interface InterviewPlayersAnswersSummary {
  name: string
  answersSummary: InterviewAnswer[]
}

export interface InterviewQuestionAnswerChange {
  questionAnswer: InterviewQuestionAnswer
}

export interface InterviewQuestionReq {
  amount: number
  category: InterviewQuestionCategory
  type: InterviewQuestionType
  difficulty: InterviewQuestionDifficulty
}

export interface InterviewQuestionRes {
  response_code: number
  results: InterviewQuestion[]
}

export interface InterviewQuestion {
  category: InterviewQuestionCategory
  type: InterviewQuestionType
  difficulty: InterviewQuestionDifficulty
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export enum InterviewQuestionCategory {
  SCIENCE_COMPUTERS = 18
}

export enum InterviewQuestionType {
  BOOLEAN = 'boolean'
}

export enum InterviewQuestionDifficulty {
  EASY = 'easy'
}

export interface InterviewQuestionAnswer {
  id: number
  answer: string
}

export interface InterviewAnswer {
  id: number
  correct: boolean
}
