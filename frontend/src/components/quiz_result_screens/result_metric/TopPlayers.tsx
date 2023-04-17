import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ResultsContext } from '../QuizResultFinished'
import { TResPlayerResult, TResResult } from '../../../types'

const TopPlayers: React.FC<{ topN: number }> = ({ topN }) => {
  const results = useContext(ResultsContext)

  const [sorted, setSorted] = useState<TResResult[]>([])

  const usrNumCorrect = useCallback((ans: TResPlayerResult[]) => {
    return ans.filter(a => a.correct).length
  }, [results])

  useEffect(() => {
    results.sort((a: TResResult, b: TResResult) => usrNumCorrect(b.answers) - usrNumCorrect(a.answers))
    setSorted(results.slice(0, topN - 1))
  }, [results])

  return (
    <div className='flex flex-col mt-5 w-full max-w-[600px]'>
      <h1 className='text-2xl self-center mb-3'>Leaderboard (Top {topN})</h1>
      <div className='p-3 bg-[#252525] rounded-md'>
        <div className='grid grid-cols-[1fr_3fr] justify-items-center border-b border-gray-400'>
          <h3>Name</h3>
          <h3>Score</h3>
        </div>
        {sorted.map((r: TResResult, idx: number) => {
          return (
            <div key={idx as React.Key} className='grid grid-cols-[1fr_3fr] justify-items-stretch py-2 my-1 hover:bg-[#2c2c2c] rounded-md'>
              <h3 className='text-center border-r border-gray-400/80'>{r.name}</h3>
              <h3 className='text-center'>{usrNumCorrect(r.answers)}</h3>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default TopPlayers
