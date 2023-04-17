import React, { useContext, useEffect, useState } from 'react'
import { useInterval } from '../../utils/helpers'
import { CurrQuestionContext } from './PlayGame'
import ShowAnswer from './ShowAnswer'
import ShowQuestion from './ShowQuestion'
import { TQuestion } from '../../types'

const useCountDown = (question: TQuestion) => {
  const [countDown, setCountDown] = useState(question?.timeLimit)

  useInterval(() => {
    const timeDiff = Math.floor((Date.now() - new Date(question?.isoTimeLastQuestionStarted as string).getTime()) / 1000)

    setCountDown(question?.timeLimit - timeDiff)
  }, 1000)

  return countDown
}

const GameLobby: React.FC = () => {
  const currQuestion = useContext(CurrQuestionContext)

  const countDown = useCountDown(currQuestion as TQuestion)

  const [timeReached, setTimeReached] = useState(false)

  useEffect(() => {
    if (countDown <= 0) {
      setTimeReached(true)
    } else {
      setTimeReached(false)
    }
  }, [countDown])

  return (
    <div className='flex flex-col gap-3 items-center'>
      {timeReached ? <ShowAnswer /> : <ShowQuestion countDown={countDown} />}
    </div>
  )
}

export default GameLobby
