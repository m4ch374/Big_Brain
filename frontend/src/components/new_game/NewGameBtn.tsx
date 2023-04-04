import React, { useCallback, useEffect, useRef, useState } from 'react';
import NewGameTooltip from './NewGameTooltip';

const NewGameBtn: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const modalRef: React.LegacyRef<HTMLElement> = useRef(null)
  const btnRef: React.LegacyRef<HTMLButtonElement> = useRef(null)

  const clickHandler = useCallback((e: MouseEvent) => {
    if (!modalRef.current?.contains(e.target as Node) && !btnRef.current?.contains(e.target as Node)) {
      setShowModal(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('click', clickHandler)

    return () => document.removeEventListener('click', clickHandler)
  }, [clickHandler])

  const btnClick = () => {
    setShowModal(true)
  }

  return (
    <>
      <button ref={btnRef} aria-label='New game' onClick={btnClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>

      {showModal && <NewGameTooltip forwardRef={modalRef} setState={setShowModal} />}
    </>
  )
}

export default NewGameBtn
