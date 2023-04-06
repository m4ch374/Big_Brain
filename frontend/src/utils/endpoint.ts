// I wish to format it to look better but eslint is annoying
export const SERVER_ROUTE = 'http://localhost:5005'

export const REGISTER = '/admin/auth/register'

export const LOGIN = '/admin/auth/login'

export const LOGOUT = '/admin/auth/logout'

export const QUIZZES = '/admin/quiz'

export const NEW_QUIZ = '/admin/quiz/new'

export const QUIZ = (id: string) => '/admin/quiz/' + id

export const START_QUIZ = (id: string) => '/admin/quiz/' + id + '/start'

export const ADVANCE_QUIZ = (id: string) => '/admin/quiz/' + id + '/advance'

export const END_QUIZ = (id: string) => '/admin/quiz/' + id + '/end'

export const SESSION_STATUS = (id: string) => '/admin/session/' + id + '/status'
