import React, { useContext } from 'react'
import { UserIdContext } from '../../pages/PlaySession'
import { ANSWER_QUESTION } from '../../utils/endpoint'
import Fetcher from '../../utils/fetcher'

const AnswerSelectSC: React.FC<{ answers: any }> = ({ answers }) => {
  const usrId = useContext(UserIdContext).toString()

  const selectAns: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    Fetcher.put(ANSWER_QUESTION(usrId))
      .withJsonPayload({
        answerIds: [parseInt(e.target.value)]
      })
      .fetchResult()
  }

  return (
    <div className='flex flex-col w-full'>
      {answers.map((ans: any) => {
        return (
          <div key={ans.id} className='flex items-center pl-4 rounded hover:bg-[#3c3c3c] w-full'>
            <input id={`ans-${ans.id}`} name='ans' value={ans.id} onChange={selectAns} type='radio' className="w-4 h-4 text-blue-600 focus:ring-blue-500 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600" />
            <label htmlFor={`ans-${ans.id}`} className='w-full py-2 ml-2 text-md font-medium text-gray-300'>{ans.text}</label>
          </div>
        )
      })}
    </div>
  )
}

export default AnswerSelectSC
