import React, { useCallback, useState } from 'react'
import { END_QUIZ } from '../utils/endpoint'
import Fetcher from '../utils/fetcher'
import Pause from './icons/Pause'
import PopupTemplate from './popups/PopupTemplate'

const StopGameBtn: React.FC<{ isGameStartBtn: any, quizId: string }> = ({ isGameStartBtn, quizId }) => {
  const [startPopup, setStartPopup] = useState(false)

  const stopGame = useCallback(async () => {
    isGameStartBtn(true)
    setStartPopup(true)

    await Fetcher.post(END_QUIZ(quizId))
      .withLocalStorageToken()
      .fetchResult()
  }, [])

  return (
    <>
      {startPopup &&
        <PopupTemplate fromStartBtn={false} setIsStartGameBtn={isGameStartBtn} startPopup={setStartPopup}>
          hi
        </PopupTemplate>
      }

      <button aria-label='stop game' onClick={stopGame} className='text-amber-500'>
        <Pause />
      </button>
    </>
  )
}

export default StopGameBtn
