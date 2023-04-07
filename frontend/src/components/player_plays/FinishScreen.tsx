import React, { useContext, useEffect } from 'react'
import { UserIdContext } from '../../pages/PlaySession'
import { QUIZ_RESULTS } from '../../utils/endpoint'
import Fetcher from '../../utils/fetcher'

const FinishScreen: React.FC = () => {
  const usrId = useContext(UserIdContext)

  useEffect(() => {
    const result = Fetcher.get(QUIZ_RESULTS(usrId.toString()))
      .fetchResult()

    result.then((data) => {
      console.log(data)
    })
  }, [])

  return (
    <div>
      hi
    </div>
  )
}

export default FinishScreen
