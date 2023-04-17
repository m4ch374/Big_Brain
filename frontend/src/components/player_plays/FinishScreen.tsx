import React, { useContext, useEffect, useState } from 'react'
import { UserIdContext } from '../../pages/PlaySession'
import { QUIZ_RESULTS } from '../../utils/endpoint'
import Fetcher from '../../utils/fetcher'
import AnswerCard from './AnswerCard'
import { IResErrorable, TResPlayerResult } from '../../types'

const FinishScreen: React.FC = () => {
  const usrId = useContext(UserIdContext)
  const [result, setResult] = useState<TResPlayerResult[]>([])

  useEffect(() => {
    const result = Fetcher.get(QUIZ_RESULTS(usrId.toString()))
      .fetchResult() as Promise<TResPlayerResult[]>

    result.then(data => {
      if (!Array.isArray(data)) {
        return
      }

      setResult(data)
    })
  }, [])

  return (
    <div className='flex flex-col gap-3 w-full items-center'>
      <h1 className='text-2xl'>Results</h1>
      <hr className='h-px my-2 bg-gray-500 border-0 w-full' />
      {result.map((a: TResPlayerResult, idx: number) => {
        return (
          <AnswerCard key={idx as React.Key} answerMeta={a} currIdx={idx} />
        )
      })}
    </div>
  )
}

export default FinishScreen
