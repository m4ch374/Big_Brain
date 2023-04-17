import React, { createContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SESSION_RESULT } from '../../utils/endpoint'
import Fetcher from '../../utils/fetcher'
import AnswerSubmitted from './result_metric/AnswerSubmitted'
import AverageTime from './result_metric/AverageTime'
import CorrectRate from './result_metric/CorrectRate'
import TopPlayers from './result_metric/TopPlayers'
import { IResResult, TResResult } from '../../types'

const ResultsContext = createContext<TResResult[]>([])

const QuizResultFinished: React.FC = () => {
  const { sessionId } = useParams()

  const [results, setResults] = useState<TResResult[]>([])

  useEffect(() => {
    const result = Fetcher.get(SESSION_RESULT(sessionId as string))
      .withLocalStorageToken()
      .fetchResult() as Promise<IResResult>

    result.then(data => {
      setResults(data.results as TResResult[])
    })
  }, [])

  return (
    <ResultsContext.Provider value={results}>
      <div className='w-full grid gap-6 justify-items-center'>
        <TopPlayers topN={5} />
        <CorrectRate />
        <AverageTime />
        <AnswerSubmitted />
      </div>
    </ResultsContext.Provider>
  )
}

export default QuizResultFinished
export { ResultsContext }
