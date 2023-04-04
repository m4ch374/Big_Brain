import React, { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';
import NewGameBtn from '../components/new_game/NewGameBtn';
import { QUIZZES } from '../utils/endpoint';
import Fetcher from '../utils/fetcher';

const Dashboard: React.FC = () => {
  const [metaData, setMetaData] = useState([])

  useEffect(() => {
    const result = Fetcher.get(QUIZZES).withLocalStorageToken().fetchResult()

    result.then((data: any) => {
      if (data.error) {
        return
      }

      setMetaData(data.quizzes)
    })
  }, [])

  return (
    <div className='p-2 mt-4 flex w-screen place-content-center'>
      <div className='grid w-[80%]'>
        <div className='flex w-[100%] justify-between'>
          <h1 className='text-2xl'>Dashboard</h1>
          <NewGameBtn />
        </div>

        <hr className='h-px my-2 bg-gray-500 border-0' />

        <div className='flex flex-wrap gap-5 justify-center'>
          {metaData?.map((d: any) => {
            return <GameCard key={d.id} metaData={d} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
