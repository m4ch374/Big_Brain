import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import QuizResultActive from '../components/quiz_result_screens/QuizResultActive'
import QuizResultFinished from '../components/quiz_result_screens/QuizResultFinished'
import { SESSION_STATUS } from '../utils/endpoint'
import Fetcher from '../utils/fetcher'
import { IResStatus, TResStatusResult } from '../types'

const QuizResults: React.FC = () => {
  const { sessionId } = useParams()
  const [isActive, setIsActive] = useState(false)
  const [loading, setLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const sessionState = useRef<TResStatusResult>()

  useEffect(() => {
    const result = Fetcher.get(SESSION_STATUS(sessionId as string))
      .withLocalStorageToken()
      .fetchResult() as Promise<IResStatus>

    result.then(data => {
      if (data.error) {
        setHasError(true)
      }

      sessionState.current = data.results
      setIsActive(data.results ? data.results.active : false)
      setLoading(false)
    })
  }, [])

  if (hasError) {
    return (
      <div className='default-padding'>
        Game has not been started
      </div>
    )
  }

  return (
    <div className='default-padding'>
      <h1 className='text-2xl'>Session: {sessionId}</h1>
      <h3 className='text-lg'>Status: {loading ? 'Loading' : isActive ? 'Active' : 'Ended'}</h3>

      <hr className='h-px my-2 bg-gray-500 border-0' />

      {!loading &&
        (isActive
          ? <QuizResultActive sessionState={sessionState.current as TResStatusResult} setActive={setIsActive} />
          : <QuizResultFinished />)}
    </div>
  )
}

export default QuizResults
