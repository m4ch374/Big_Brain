import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { QUIZ } from '../utils/endpoint';
import Fetcher from '../utils/fetcher';
import Delete from './icons/Delete';
import Edit from './icons/Edit';
import PlayGameBtn from './PlayGameBtn';
import StopGameBtn from './StopGameBtn';

const GameCard: React.FC<{ metaData: any }> = ({ metaData }) => {
  const [data, setData]: any = useState()
  const [deleted, setDeleted] = useState(false)
  const [isGameStartBtn, setIsGameStartBtn] = useState(true)

  const deleteBtn = useCallback(() => {
    const result = Fetcher.delete(QUIZ(metaData.id))
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

    return data.questions.map((q: any) => parseInt(q.timeLimit)).reduce((acc: number, curr: number) => acc + curr)
  }, [data])

  useEffect(() => {
    const result = Fetcher.get(QUIZ(metaData.id))
      .withLocalStorageToken()
      .fetchResult()

    result.then((resData: any) => {
      setData(resData)
      setIsGameStartBtn(resData.active === null)
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

          <div className='place-self-end pr-3 pb-2 flex gap-3'>
            {isGameStartBtn ? <PlayGameBtn isGameStartBtn={setIsGameStartBtn} quizId={metaData.id} /> : <StopGameBtn isGameStartBtn={setIsGameStartBtn} quizId={metaData.id} />}

            <Link to={`/quiz/${metaData.id}`}>
              <Edit />
            </Link>

            <button onClick={deleteBtn} aria-label='delete game' className='text-red-600'>
              <Delete />
            </button>
          </div>
        </div>
      }
    </>
  )
}

export default GameCard
