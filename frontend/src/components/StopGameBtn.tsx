import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Pause from './icons/Pause'
import PopupTemplate from './popups/PopupTemplate'

const StopGameBtn: React.FC<{ quizId: string }> = ({ quizId }) => {
  const [startPopup, setStartPopup] = useState(false)

  return (
    <>
      {startPopup &&
        <PopupTemplate startPopup={setStartPopup}>
          <h1 className='text-lg'>Would you like to view the results?</h1>
          <div className='flex gap-3 pt-4'>
            <Link to={`/results/${localStorage.getItem(quizId)}`} className='bg-blue-500 px-3 py-1 rounded-md'>
              Yes
            </Link>
            <button className='bg-red-400 px-3 py-1 rounded-md' onClick={() => setStartPopup(false)}>
              No
            </button>
          </div>
        </PopupTemplate>
      }

      <button aria-label='stop game' onClick={() => setStartPopup(true)} className='text-amber-500'>
        <Pause />
      </button>
    </>
  )
}

export default StopGameBtn
