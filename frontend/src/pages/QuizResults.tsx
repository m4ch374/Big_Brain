import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SESSION_STATUS } from '../utils/endpoint'
import Fetcher from '../utils/fetcher'

const QuizResults: React.FC = () => {
  const { sessionId } = useParams()

  useEffect(() => {
    const result = Fetcher.get(SESSION_STATUS(sessionId as string))
      .withLocalStorageToken()
      .fetchResult()

    result.then((data: any) => {
      console.log(data.results)
    })
  }, [])

  return (
    <div className='default-padding'>
      {sessionId}
    </div>
  )
}

export default QuizResults
