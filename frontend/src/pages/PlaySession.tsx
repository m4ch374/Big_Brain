import React from 'react'
import { useParams } from 'react-router-dom'

const PlaySession: React.FC = () => {
  const { sessionId } = useParams()

  return (
    <div>
      {sessionId}
    </div>
  )
}

export default PlaySession
