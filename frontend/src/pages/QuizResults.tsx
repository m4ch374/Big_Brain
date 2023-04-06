import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import QuizResultActive from '../components/quiz_result_screens/QuizResultActive'
import QuizResultFinished from '../components/quiz_result_screens/QuizResultFinished'
import { SESSION_STATUS } from '../utils/endpoint'
import Fetcher from '../utils/fetcher'

const QuizResults: React.FC = () => {
  const { sessionId } = useParams()
  const [isActive, setIsActive] = useState<boolean>()
  const sessionState = useRef()

  useEffect(() => {
    const result = Fetcher.get(SESSION_STATUS(sessionId as string))
      .withLocalStorageToken()
      .fetchResult()

    result.then((data: any) => {
      console.log(data.results)
      sessionState.current = data.results
      setIsActive(data.results.active)
    })
  }, [])

  return (
    <div className='default-padding'>
      <h1 className='text-2xl'>Session: {sessionId}</h1>
      <h3 className='text-lg'>Status: {isActive ? 'Active' : 'Ended'}</h3>

      <hr className='h-px my-2 bg-gray-500 border-0' />

      {isActive ? <QuizResultActive sessionState={sessionState.current} setActive={setIsActive} /> : <QuizResultFinished />}
    </div>
  )
}

export default QuizResults