import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { JOIN_SESSION } from '../../utils/endpoint'
import Fetcher from '../../utils/fetcher'
import InputSection from '../inputs/InputSection'
import { IPlayerJoin } from '../../types'

type TJoinGame = {
  setId: React.Dispatch<React.SetStateAction<number>>
}

const JoinGame: React.FC<TJoinGame> = ({ setId }) => {
  const { sessionId } = useParams()
  const [errMsg, setErrMsg] = useState('')

  // Not using useCallBack this time cuz we'll need to update on each rerender
  const formSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const input = e.currentTarget

    const session = input.sessionId.value === '' ? sessionId : input.sessionId.value
    const usrName = input.usrName.value

    if (usrName === '') {
      setErrMsg('Name cannot be blank')
      return
    }

    const result = Fetcher.post(JOIN_SESSION(session))
      .withJsonPayload({
        name: usrName
      })
      .fetchResult() as Promise<IPlayerJoin>

    result.then(data => {
      if (data.error) {
        setErrMsg('Cannot join session')
      } else {
        setId(data.playerId)
      }
    })
  }

  return (
    <form onSubmit={formSubmit} className='flex flex-col gap-3'>
      <h1 className='text-2xl'>Join Session</h1>

      <label htmlFor='sessionId'>Session ID:</label>
      <InputSection identifier='sessionId' type='text' placeholder={sessionId as string} />

      <label htmlFor='usrName'>Name:</label>
      <InputSection identifier='usrName' type='text' placeholder='Enter Name' />

      {errMsg !== '' && <h6 className='text-sm text-red-500'>{errMsg}</h6>}

      <button type='submit' className='px-2 py-1.5 bg-blue-500 rounded-md mt-5'>
        Join
      </button>
    </form>
  )
}

export default JoinGame
