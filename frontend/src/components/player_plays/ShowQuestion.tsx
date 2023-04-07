import React, { useContext } from 'react'
import AnswerSelectMC from './AnswerSelectMC'
import AnswerSelectSC from './AnswerSelectSC'
import DisplayEmbeds from './DisplayEmbeds'
import { CurrQuestionContext } from './PlayGame'

const ShowQuestion: React.FC<{ countDown: string }> = ({ countDown }) => {
  const currQuestion: any = useContext(CurrQuestionContext)

  return (
    <>
      <h1 className='text-2xl font-bold'>{isNaN(parseInt(countDown)) ? 'Loading' : countDown}</h1>
      <h1 className='text-2xl'>{currQuestion ? currQuestion.question.text : 'Loading'}</h1>
      {!currQuestion ? 'Loading' : <DisplayEmbeds embeds={currQuestion.embeds} />}
      {!currQuestion
        ? 'Loading'
        : currQuestion.question.type === 'sc'
          ? <AnswerSelectSC answers={currQuestion.answer} />
          : <AnswerSelectMC answers={currQuestion.answer} />
      }
    </>
  )
}

export default ShowQuestion
