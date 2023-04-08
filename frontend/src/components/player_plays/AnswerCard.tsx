import React, { useContext } from 'react'
import { CurrQuestionContext } from './PlayGame'

const AnswerCard: React.FC<{ answerMeta: any, currIdx: number }> = ({ answerMeta, currIdx }) => {
  const currQuestion: any = useContext(CurrQuestionContext)

  return (
    <div className='bg-[#2c2c2c] w-[90%] p-2 rounded-md hover:bg-[#3c3c3c]'>
      <h1 className='text-lg mb-3'>Question: {currIdx + 1}</h1>
      <h1 className='text-lg'>Your Answers:</h1>
      <ul className='space-y-1 text-gray-300 list-disc list-inside mb-3'>
        {answerMeta.answerIds.map((id: number) => {
          return (
            <li key={id}>
              {currQuestion?.answer.find((a: any) => parseInt(a.id) === id).text}
            </li>
          )
        })}
      </ul>
      <h3 className='text-md'>
        You answer is:
        <span className={answerMeta.correct ? 'text-green-400' : 'text-red-500'}>
          {answerMeta.correct ? ' Correct' : ' Wrong'}
        </span>
      </h3>
      <h3 className='text-md'>
        Time taken: {Math.floor((new Date(answerMeta.answeredAt).getTime() -
          new Date(answerMeta.questionStartedAt).getTime()) / 1000)} seconds
      </h3>
    </div>
  )
}

export default AnswerCard
