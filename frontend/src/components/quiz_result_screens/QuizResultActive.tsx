import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ADVANCE_QUIZ, END_QUIZ } from '../../utils/endpoint'
import Fetcher from '../../utils/fetcher'

const QuizResultActive: React.FC<{ sessionState: any, setActive: any }> = ({ sessionState, setActive }) => {
  const { sessionId } = useParams()
  const quizId = useRef(-1)
  const [currPos, setCurrPos] = useState(-1)

  useEffect(() => {
    for (let i = 0; i < localStorage.length; i++) {
      const currKey = localStorage.key(i)
      if (localStorage.getItem(currKey as string) === sessionId) {
        quizId.current = parseInt(currKey as string)
      }
    }

    setCurrPos(sessionState.position)
  }, [])

  const questionString = useMemo(() => {
    if (currPos === -1) {
      return 'Quiz just started'
    }

    if (currPos >= sessionState.questions.length) {
      return 'Quiz ended'
    }

    return sessionState.questions[currPos].question.text
  }, [currPos])

  const proceedBtn = useCallback(async () => {
    if (currPos === sessionState.questions.length - 1) {
      await Fetcher.post(END_QUIZ(quizId.current.toString()))
        .withLocalStorageToken()
        .fetchResult()

      setActive(false)
      return
    }

    await Fetcher.post(ADVANCE_QUIZ(quizId.current.toString()))
      .withLocalStorageToken()
      .fetchResult()

    setCurrPos((pos) => pos + 1)
  }, [currPos])

  return (
    <>
      <h1 className='text-2xl'>Current question:</h1>
      <h3 className='text-lg'>{questionString}</h3>
      <div className='flex mt-3 gap-3'>
        <button onClick={proceedBtn} className='px-2 py-1 bg-blue-500 rounded-md'>
          Next question
        </button>
        <Link to={'/'} className='px-2 py-1 bg-red-500 rounded-md'>
          Stop game
        </Link>
      </div>
    </>
  )
}

export default QuizResultActive
