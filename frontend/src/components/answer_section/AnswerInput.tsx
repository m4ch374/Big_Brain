import React, { useCallback, useState } from 'react';
import Check from '../icons/Check';
import Delete from '../icons/Delete';

type TAnswerInput = {
  setShow: React.Dispatch<React.SetStateAction<boolean>>,
  appendFnc: (ans: string) => void
}

const AnswerInput: React.FC<TAnswerInput> = ({ setShow, appendFnc }) => {
  const [input, setInput] = useState('')

  const addAnswer = useCallback(() => {
    setShow(false)
    appendFnc(input)
  }, [input])

  return (
    <div className='flex justify-between pl-1 py-1 rounded hover:bg-[#4c4c4c] w-full'>
        <div className='flex items-center'>
          <input
            type='text'
            onChange={(e) => setInput(e.target.value)}
            placeholder='New answer'
            aria-label='new answer input'
            className='border
              rounded
              border-gray-700
              bg-[#2c2c2c]
              w-full
              ml-2
              pl-1
              text-md
              font-medium
              text-gray-300'
            />
        </div>

        <div className='flex items-center mr-4 gap-4'>
          <button type='button' aria-label='discard answer' onClick={() => setShow(false)} className='text-red-500'>
            <Delete />
          </button>
          <button type='button' aria-label='add answer' onClick={addAnswer} className='text-green-400'>
            <Check />
          </button>
        </div>
    </div>
  )
}

export default AnswerInput
