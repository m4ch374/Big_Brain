import React, { useCallback, useEffect, useState } from 'react';
import { QUIZ } from '../utils/endpoint';
import Fetcher from '../utils/fetcher';

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

          <div className='place-self-end pr-2'>
            <button onClick={deleteBtn} aria-label='delete game' className='text-red-600'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
        </div>
      }
    </>
  )
}

export default GameCard
