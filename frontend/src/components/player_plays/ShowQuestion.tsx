import React, { useContext } from 'react'
import AnswerSelectMC from './AnswerSelectMC'
import AnswerSelectSC from './AnswerSelectSC'
import DisplayEmbeds from './DisplayEmbeds'
import { CurrQuestionContext } from './PlayGame'
import { TQuestion } from '../../types'

const ShowQuestion: React.FC<{ countDown: number }> = ({ countDown }) => {
  const currQuestion = useContext(CurrQuestionContext) as TQuestion

  return (
    <>
      <h1 className='text-2xl font-bold'>{isNaN(countDown) ? 'Loading' : countDown}</h1>
      <h1 className='text-2xl'>{currQuestion ? currQuestion.question.text : 'Loading'}</h1>
      {!currQuestion ? 'Loading' : <DisplayEmbeds embeds={currQuestion.embeds} />}
      {!currQuestion
        ? 'Loading'
        : currQuestion.question.type === 'sc'
          ? <AnswerSelectSC answers={currQuestion.answers} />
          : <AnswerSelectMC answers={currQuestion.answers} />
      }
    </>
  )
}

export default ShowQuestion
