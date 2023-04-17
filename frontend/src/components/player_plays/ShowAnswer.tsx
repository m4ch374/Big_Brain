import React, { useContext, useEffect, useState } from 'react'
import { UserIdContext } from '../../pages/PlaySession'
import { ANSWER_QUESTION } from '../../utils/endpoint'
import Fetcher from '../../utils/fetcher'
import { CurrQuestionContext } from './PlayGame'
import { IPlayerGetAnswer, TQuestion } from '../../types'

const ShowAnswer: React.FC = () => {
  const currQuestion = useContext(CurrQuestionContext) as TQuestion
  const usrId = useContext(UserIdContext)

  const [ans, setAns] = useState<string[]>([])

  useEffect(() => {
    const result = Fetcher.get(ANSWER_QUESTION(usrId.toString()))
      .fetchResult() as Promise<IPlayerGetAnswer>

    result.then(data => {
      if (data.error || !currQuestion) {
        return
      }

      const getQuesitonData = (qId: number) => currQuestion.answers.find(a => a.id === qId)

      const allAns = data.answerIds ? data.answerIds.map(a => getQuesitonData(a)?.text) : []
      setAns(allAns as string[])
    })
  }, [currQuestion])

  return (
    <>
      <h1 className='text-2xl'>Time Reached</h1>
      <h1 className='text-2xl'>Answer is:</h1>
      {ans.map((a: string, idx: number) => {
        return (
          <h3 key={idx as React.Key} className='text-xl'>{a}</h3>
        )
      })}
    </>
  )
}

export default ShowAnswer
