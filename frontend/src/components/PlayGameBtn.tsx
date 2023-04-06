import React, { useCallback, useState } from 'react';
import { QUIZ, START_QUIZ } from '../utils/endpoint';
import Fetcher from '../utils/fetcher';
import Clipboard from './icons/Clipboard';
import Cross from './icons/Cross';
import Play from './icons/Play';
import PopupTemplate from './popups/PopupTemplate';

const PlayGameBtn: React.FC<{ isGameStartBtn: any, quizId: string }> = ({ isGameStartBtn, quizId }) => {
  const [startPopup, setStartPopup] = useState(false)
  const [clipboard, setClipboard] = useState('Please wait')

  const startGame = useCallback(async () => {
    setStartPopup(true)

    await Fetcher.post(START_QUIZ(quizId))
      .withLocalStorageToken()
      .fetchResult()

    const result: any = await Fetcher.get(QUIZ(quizId))
      .withLocalStorageToken()
      .fetchResult()

    setClipboard(result.active)
    localStorage.setItem(quizId, result.active)
  }, [])

  const closePopup = useCallback(() => {
    setStartPopup(false)
    isGameStartBtn(false)
  }, [])

  const copyClipboard = useCallback(() => {
    const txt = `http://localhost:3000/play/${clipboard}`
    navigator.clipboard.writeText(txt)
  }, [clipboard])

  return (
    <>
      { startPopup &&
        <PopupTemplate fromStartBtn={true} setIsStartGameBtn={isGameStartBtn} startPopup={setStartPopup}>
          <div className='flex justify-between items-center mb-4'>
            <h1 className='text-2xl'>Session ID</h1>
            <button aria-label='close popup' onClick={closePopup}>
              <Cross />
            </button>
          </div>
          <div className='border border-gray-400 w-full flex justify-between rounded-md mb-2'>
            <input type='text' placeholder={clipboard} disabled aria-label='session id' className='h-full p-1 w-full rounded-md' />
            <button aria-label='copy id' onClick={copyClipboard} className='px-2 bg-gray-300 rounded-r-md'>
              <Clipboard />
            </button>
          </div>
        </PopupTemplate>
      }

      <button aria-label='play game' onClick={startGame} className='text-green-500'>
        <Play />
      </button>
    </>
  )
}

export default PlayGameBtn
