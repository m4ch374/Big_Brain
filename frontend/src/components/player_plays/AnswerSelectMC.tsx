import React, { useContext, useEffect, useState } from 'react'
import { UserIdContext } from '../../pages/PlaySession'
import { ANSWER_QUESTION } from '../../utils/endpoint'
import Fetcher from '../../utils/fetcher'
import { TAnswerDetails } from '../../types'

const AnswerSelectMC: React.FC<{ answers: TAnswerDetails[] }> = ({ answers }) => {
  const usrId = useContext(UserIdContext)

  const [ans, setAns] = useState<number[]>([])

  const checkBox: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let newAns: number[] = []

    if (e.target.checked) {
      newAns = [parseInt(e.target.value), ...ans]
    } else {
      newAns = ans.filter(a => a !== parseInt(e.target.value))
    }
    setAns(newAns)
  }

  useEffect(() => {
    Fetcher.put(ANSWER_QUESTION(usrId.toString()))
      .withJsonPayload({
        answerIds: [...ans]
      })
      .fetchResult()
  }, [ans])

  return (
    <div className='flex flex-col w-full'>
      {answers.map(ans => {
        return (
          <div key={ans.id} className='flex items-center pl-4 rounded hover:bg-[#3c3c3c] w-full'>
            <input id={`ans-${ans.id}`} value={ans.id} type='checkbox' onChange={checkBox} className="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600" />
            <label htmlFor={`ans-${ans.id}`} className='w-full py-2 ml-2 text-md font-medium text-gray-300'>{ans.text}</label>
          </div>
        )
      })}
    </div>
  )
}

export default AnswerSelectMC
