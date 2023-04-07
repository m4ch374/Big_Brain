import React, { useContext, useEffect, useState } from 'react'
import { UserIdContext } from '../../pages/PlaySession'
import { ANSWER_QUESTION } from '../../utils/endpoint'
import Fetcher from '../../utils/fetcher'
import { CurrQuestionContext } from './PlayGame'

const ShowAnswer: React.FC = () => {
  const currQuestion: any = useContext(CurrQuestionContext)
  const usrId = useContext(UserIdContext)

  const [ans, setAns] = useState<string[]>([])

  useEffect(() => {
    const result = Fetcher.get(ANSWER_QUESTION(usrId.toString()))
      .fetchResult()

    result.then((data: any) => {
      if (data.error || !currQuestion) {
        return
      }

      const getQuesitonData = (qId: any) => currQuestion.answer.find((a: any) => parseInt(a.id) === parseInt(qId))

      const allAns = data.answerIds.map((a: any) => getQuesitonData(a).text)
      setAns(allAns)
    })
  }, [currQuestion])

  return (
    <>
      <h1 className='text-2xl'>Time Reached</h1>
      <h1 className='text-2xl'>Answer is:</h1>
      {ans.map((a: any, idx: any) => {
        return (
          <h3 key={idx} className='text-xl'>{a}</h3>
        )
      })}
    </>
  )
}

export default ShowAnswer
