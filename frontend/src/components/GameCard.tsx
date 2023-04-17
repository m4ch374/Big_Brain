import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { QUIZ } from '../utils/endpoint';
import Fetcher from '../utils/fetcher';
import Delete from './icons/Delete';
import Edit from './icons/Edit';
import PlayGameBtn from './PlayGameBtn';
import StopGameBtn from './StopGameBtn';
import { IResQuiz, TQuestion, TResQuizMeta } from '../types';

const GameCard: React.FC<{ metaData: TResQuizMeta }> = ({ metaData }) => {
  const [data, setData] = useState<IResQuiz>()
  const [deleted, setDeleted] = useState(false)

  const deleteBtn = useCallback(() => {
    const result = Fetcher.delete(QUIZ(metaData.id.toString()))
      .withLocalStorageToken()
      .fetchResult()

    result.then(() => {
      setDeleted(true)
    })
  }, [])

  const getTotalTime = useCallback(() => {
    if (!data?.questions) {
      return 0
    }

    if (data.questions.length === 0) {
      return 0
    }

    return data.questions.map((q: TQuestion) => q.timeLimit)
      .reduce((acc: number, curr: number) => acc + curr)
  }, [data])

  useEffect(() => {
    const result = Fetcher.get(QUIZ(metaData.id.toString()))
      .withLocalStorageToken()
      .fetchResult() as Promise<IResQuiz>

    result.then((resData) => {
      setData(resData)
    })
  }, [])

  return (
    <>
      {!deleted &&
        <div className='bg-white text-gray-900 w-[250px] rounded-lg flex flex-col'>
          <img alt='Game Image' src={metaData.thumbnail} className='w-full aspect-[4/3] object-cover rounded-t-lg' />

          <div className='p-2'>
            <h1 className='text-xl'>Game: {metaData.name}</h1>
            <h3>Questions: {data?.questions ? data.questions.length : 0}</h3>
            <h3>{`Total time: ${getTotalTime()}`}</h3>
          </div>

          <div className='m-4 mt-0 flex justify-between'>
            <div className='flex gap-3'>
              <PlayGameBtn quizId={metaData.id.toString()} />
              <StopGameBtn quizId={metaData.id.toString()} />
            </div>
            <div className='flex gap-3'>
              <Link to={`/quiz/${metaData.id}`}>
                <Edit />
              </Link>

              <button onClick={deleteBtn} aria-label='delete game' className='text-red-600'>
                <Delete />
              </button>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default GameCard
