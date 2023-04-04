import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { QUIZ } from '../utils/endpoint';
import Fetcher from '../utils/fetcher';
import Delete from './icons/Delete';
import Edit from './icons/Edit';

const GameCard: React.FC<{ metaData: any }> = ({ metaData }) => {
  const [data, setData]: any = useState()
  const [deleted, setDeleted] = useState(false)

  const deleteBtn = useCallback(() => {
    const result = Fetcher.delete(QUIZ(metaData.id))
      .withLocalStorageToken()
      .fetchResult()

    result.then(() => {
      setDeleted(true)
    })
  }, [])

  useEffect(() => {
    const result = Fetcher.get(QUIZ(metaData.id))
      .withLocalStorageToken()
      .fetchResult()

    result.then((resData: any) => {
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
            <h3>Total time: {data?.questions?.length ? '1' : '0'}</h3>
          </div>

          <div className='place-self-end pr-3 pb-2 flex gap-3'>
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
