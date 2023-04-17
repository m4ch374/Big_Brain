import React, { useState } from 'react';
import Plus from '../icons/Plus';
import AnswerInput from './AnswerInput';
import AnswerOption from './AnswerOption';
import { TAnswerDetails } from '../../types';
import { TAnswerOption } from '../../pages/EditQuestion';

const AnswerSection: React.FC<{ answerState: TAnswerOption }> = ({ answerState }) => {
  const [newAnswer, setNewAnswer] = useState(false)

  return (
    <>
      <div className='flex justify-between'>
        <label htmlFor='question-type' className='block mb-1'>Answers: </label>
        <button type='button' onClick={() => setNewAnswer(true)} aria-label='add answer option'>
          <Plus />
        </button>
      </div>
      <hr className='h-px bg-gray-500 border-0' />

      <div className='flex flex-col justify-start mt-4'>
        {newAnswer && <AnswerInput setShow={setNewAnswer} appendFnc={answerState.appendAnswer} />}

        {answerState.answerOption.map((a: TAnswerDetails, idx: number) => {
          return (
            <AnswerOption key={idx as React.Key} ans={a} removeFnc={answerState.removeAnswer} setAns={answerState.setAnswer} />
          )
        })}
      </div>
    </>
  )
}

export default AnswerSection
