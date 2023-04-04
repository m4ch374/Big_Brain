import React, { useCallback, useMemo, useState } from 'react';
import Plus from '../icons/Plus';
import AnswerInput from './AnswerInput';
import AnswerOption from './AnswerOption';

// Cant type any interface cuz it will make eslint unhappy
const AnswerSection: React.FC<{ answerState: any }> = ({ answerState }) => {
  const [newAnswer, setNewAnswer] = useState(false)
  const [answerOptions, setAnswerOptions]: any = answerState

  const answerId = useMemo(() => {
    if (answerOptions.length === 0) {
      return 0
    }

    const res = Math.max(...answerOptions.map((ans: any) => parseInt(ans.id)))
    return res + 1
  }, [answerOptions])

  const appendAnswer = useCallback((ans: any) => {
    setAnswerOptions([{ id: answerId, text: ans, isAns: false }, ...answerOptions])
  }, [answerOptions])

  const removeAnswer = useCallback((ans: any) => {
    setAnswerOptions(answerOptions.filter((a: any) => a.id !== ans))
  }, [answerOptions])

  const setAnswer = useCallback((ans: any, isCorrect: any) => {
    const idx = answerOptions.findIndex((a: any) => a.id === ans)
    answerOptions[idx].isAns = isCorrect
    setAnswerOptions(answerOptions)
  }, [answerOptions])

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
        {newAnswer && <AnswerInput setShow={setNewAnswer} appendFnc={appendAnswer} />}

        {answerOptions.map((a: any, idx: any) => {
          return (
            <AnswerOption key={idx} ans={a} removeFnc={removeAnswer} setAns={setAnswer} />
          )
        })}
      </div>
    </>
  )
}

export default AnswerSection
