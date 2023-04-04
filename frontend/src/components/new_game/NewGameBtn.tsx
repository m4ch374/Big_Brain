import React, { useCallback, useEffect, useRef, useState } from 'react';
import Plus from '../icons/Plus';
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
        <Plus />
      </button>

      {showModal && <NewGameTooltip forwardRef={modalRef} setState={setShowModal} />}
    </>
  )
}

export default NewGameBtn
