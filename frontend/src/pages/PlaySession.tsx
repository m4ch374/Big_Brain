import React, { createContext, useState } from 'react'
import JoinGame from '../components/player_plays/JoinGame'
import PlayGame from '../components/player_plays/PlayGame'

const UserIdContext = createContext(-1)

const PlaySession: React.FC = () => {
  const [usrId, setUsrId] = useState(-1)

  return (
    <UserIdContext.Provider value={usrId}>
      <div className='m-8 flex justify-center'>
        {usrId === -1 ? <JoinGame setId={setUsrId} /> : <PlayGame /> }
      </div>
    </UserIdContext.Provider>
  )
}

export default PlaySession
export { UserIdContext }
