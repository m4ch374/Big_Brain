import React, { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';
import NewGameBtn from '../components/new_game/NewGameBtn';
import { QUIZZES } from '../utils/endpoint';
import Fetcher from '../utils/fetcher';
import { IResQuizMeta, TResQuizMeta } from '../types';

const Dashboard: React.FC = () => {
  const [metaData, setMetaData] = useState<TResQuizMeta[]>([])

  useEffect(() => {
    const result = Fetcher.get(QUIZZES).withLocalStorageToken().fetchResult() as Promise<IResQuizMeta>

    result.then(data => {
      if (data.error) {
        return
      }

      if (typeof data.quizzes === 'undefined') {
        return
      }

      setMetaData(data.quizzes)
    })
  }, [])

  return (
    <div className='default-padding flex w-screen place-content-center'>
      <div className='grid min-w-[250px] w-[70%]'>
        <div className='flex w-full justify-between'>
          <h1 className='text-2xl'>Dashboard</h1>
          <NewGameBtn />
        </div>

        <hr className='h-px my-2 bg-gray-500 border-0' />

        <div className='flex flex-wrap gap-5 justify-center'>
          {metaData?.map(d => {
            return <GameCard key={d.id} metaData={d} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
