import React, { createContext, useContext, useState } from 'react'
import { UserIdContext } from '../../pages/PlaySession'
import { PLAYER_SESSION_STATUS, QUESTION } from '../../utils/endpoint'
import Fetcher from '../../utils/fetcher'
import { useInterval } from '../../utils/helpers'
import FinishScreen from './FinishScreen'
import GameLobby from './GameLobby'
import WaitingLobby from './WaitingLobby'
import { IPlayerQuestion, IPlayerStatus, TQuestion } from '../../types'

const CurrQuestionContext = createContext<TQuestion | null>(null)

const PlayGame: React.FC = () => {
  const usrId = useContext(UserIdContext).toString()

  const [started, setStarted] = useState(false)
  const [ended, setEnded] = useState(false)
  const [question, setQuestion] = useState<TQuestion>()

  useInterval(async () => {
    if (ended) {
      return
    }

    const isStarted = await Fetcher.get(PLAYER_SESSION_STATUS(usrId))
      .fetchResult() as IPlayerStatus

    if (isStarted.error) {
      setEnded(true)
      return
    }

    setStarted(isStarted.started)
    if (!isStarted.started) {
      return
    }

    const result = await Fetcher.get(QUESTION(usrId)).fetchResult() as IPlayerQuestion
    if (result.question) {
      setQuestion(result.question)
    }
  }, 1000)

  return (
    <CurrQuestionContext.Provider value={question as TQuestion}>
      {ended
        ? <FinishScreen />
        : started ? <GameLobby /> : <WaitingLobby />}
    </CurrQuestionContext.Provider>
  )
}

export default PlayGame
export { CurrQuestionContext }
