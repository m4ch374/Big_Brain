import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { END_QUIZ } from '../utils/endpoint'
import Fetcher from '../utils/fetcher'
import Pause from './icons/Pause'
import PopupTemplate from './popups/PopupTemplate'

const StopGameBtn: React.FC<{ isGameStartBtn: any, quizId: string }> = ({ isGameStartBtn, quizId }) => {
  const [startPopup, setStartPopup] = useState(false)

  const stopGame = useCallback(() => {
    setStartPopup(true)

    Fetcher.post(END_QUIZ(quizId))
      .withLocalStorageToken()
      .fetchResult()
  }, [])

  const closeBtn = useCallback(() => {
    setStartPopup(true)
    isGameStartBtn(true)
  }, [])

  return (
    <>
      {startPopup &&
        <PopupTemplate fromStartBtn={false} setIsStartGameBtn={isGameStartBtn} startPopup={setStartPopup}>
          <h1 className='text-lg'>Would you like to view the results?</h1>
          <div className='flex gap-3 pt-4'>
            <Link to={`/results/${localStorage.getItem(quizId)}`} className='bg-blue-500 px-3 py-1 rounded-md'>
              Yes
            </Link>
            <button className='bg-red-400 px-3 py-1 rounded-md' onClick={closeBtn}>
              No
            </button>
          </div>
        </PopupTemplate>
      }

      <button aria-label='stop game' onClick={stopGame} className='text-amber-500'>
        <Pause />
      </button>
    </>
  )
}

export default StopGameBtn
