import React, { useCallback, useState } from 'react';
import { NEW_QUIZ } from '../../utils/endpoint';
import Fetcher from '../../utils/fetcher';

// Sigh..... Interface somehow makes esline unhappy
const NewGameTooltip: React.FC<{ forwardRef: React.LegacyRef<HTMLElement>, setState: Function }> = ({ forwardRef, setState }) => {
  const [errMsg, setErrMsg] = useState('')

  const formSubmit: React.FormEventHandler<HTMLFormElement> = useCallback((e) => {
    const targetInput: any = e.target

    const result = Fetcher.post(NEW_QUIZ).withLocalStorageToken()
      .withJsonPayload({ name: targetInput.game.value })
      .fetchResult()

    result.then((data: any) => {
      if (!data.error) {
        setState(false)
      } else {
        setErrMsg(data.error)
      }
    })
  }, [])

  return (
    <aside ref={forwardRef} className='absolute z-10 right-[12%] top-[110px] bg-white text-gray-900 w-[200px] p-2 rounded-lg'>
      <form className='flex flex-col' onSubmit={formSubmit}>
        <label htmlFor='game'>Create New Game</label>
        <input id='game' name='game' type='text' placeholder='My new game' className='border-[1px] py-1 rounded-md mt-2 pl-1'></input>

        {errMsg !== '' && <label className='text-sm text-red-500 mt-1'>{errMsg}</label>}

        <button type='submit' className='p-1 bg-blue-500 rounded-lg mt-2 place-self-end text-white'>
          Create
        </button>
      </form>
    </aside>
  )
}

export default NewGameTooltip
