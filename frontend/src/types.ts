// Some are using types, some are using interface
// but I dont think there's a need to seperate them into different files

// Custom types
export type TResQuizMeta = {
  id: number,
  createdAt: string,
  name: string,
  thumbnail: string,
  owner: string,
  active: boolean | null,
  oldsessions: number[]
}

export enum QTypeEnum {
  MC = 'mc',
  SC = 'sc'
}

export type TQuestionDetails = {
  type: QTypeEnum,
  text: string
}

export type TAnswerDetails = {
  id: number,
  text: string,
  isAns: boolean
}

export enum ETypeEnum {
  VID = 'vid',
  IMG = 'img',
  NIL = 'nil'
}

export type TEmbeds = {
  type: ETypeEnum,
  data: string
}

export type TQuestion = {
  id: number,
  question: TQuestionDetails,
  answers: TAnswerDetails[],
  timeLimit: number,
  points: number,
  embeds: TEmbeds,
  isoTimeLastQuestionStarted?: string
}

export type TResStatusResult = {
  active: boolean,
  answerAvailable: boolean,
  isoTimeLastQuestionStarted: string,
  position: number,
  questions: TQuestion[],
  players: string[]
}

export type TResPlayerResult = {
  answerIds: number[],
  correct: boolean,
  answeredAt: string,
  questionStartedAt: string
}

export type TResResult = {
  name: string,
  answers: TResPlayerResult[]
}

// Response types
export interface IResErrorable {
  error: string
}

export interface IResAuth extends IResErrorable {
  token: string
}

export interface IResQuizMeta extends IResErrorable {
  quizzes: TResQuizMeta[]
}

export interface IResQuiz extends IResErrorable {
  questions: TQuestion[],
  createdAt: string,
  name: string,
  thumbnail: string,
  owner: string,
  active: boolean | null,
  oldSessions: number[]
}

export interface IResStatus extends IResErrorable {
  results: TResStatusResult
}

export interface IResResult extends IResErrorable {
  results: TResResult[]
}

export interface IPlayerJoin extends IResErrorable {
  playerId: number
}

export interface IPlayerStatus extends IResErrorable {
  started: boolean
}

export interface IPlayerQuestion extends IResErrorable {
  isoTimeLastQuestionStarted: string,
  question: TQuestion
}

export interface IPlayerGetAnswer extends IResErrorable {
  answerIds: number[]
}
