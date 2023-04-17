import React from 'react';
import Delete from '../icons/Delete';
import { TAnswerDetails } from '../../types';

type TAnswerOption = {
  ans: TAnswerDetails,
  removeFnc: (aId: number) => void,
  setAns: (aId: number, checked: boolean) => void
}

const AnswerOption: React.FC<TAnswerOption> = ({ ans, removeFnc, setAns }) => {
  return (
    <div className='flex items-center pl-4 rounded hover:bg-[#3c3c3c]'>
        <input
          id={`check-${ans.id}`}
          defaultChecked={ans.isAns}
          name={`check-${ans.id}`}
          onChange={(e) => setAns(ans.id, e.target.checked)}
          type='checkbox'
          className="w-4
            h-4
            text-blue-600
            rounded
            focus:ring-blue-600
            ring-offset-gray-800
            focus:ring-2
            bg-gray-700
            border-gray-600"
            />

        <label htmlFor={`check-${ans.id}`} className='w-full py-2 ml-2 text-md font-medium text-gray-300'>
          {ans.text}
        </label>

        <button type='button' className='text-red-500 mr-4' onClick={() => removeFnc(ans.id)}>
          <Delete />
        </button>
    </div>
  )
}

export default AnswerOption
