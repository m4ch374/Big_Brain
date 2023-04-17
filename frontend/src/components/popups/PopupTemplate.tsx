import React, { useCallback } from 'react';

type TPopupTemplate = {
  children?: string | JSX.Element | JSX.Element[],
  startPopup: React.Dispatch<React.SetStateAction<boolean>>
}

const PopupTemplate: React.FC<TPopupTemplate> = ({ children = undefined, startPopup }) => {
  const clickedBackdrop = useCallback(() => {
    startPopup(false)
  }, [])

  return (
    <div onClick={clickedBackdrop} className='fixed top-0 left-0 h-full w-full bg-[#1c1c1c]/30  backdrop-filter backdrop-blur-lg flex justify-center items-center'>
      <div onClick={(e) => e.stopPropagation()} className='min-w-[250px] w-[50%] max-w-[800px] bg-white p-2 rounded-md'>
        {children}
      </div>
    </div>
  )
}

export default PopupTemplate
