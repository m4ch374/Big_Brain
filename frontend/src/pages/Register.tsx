import React from 'react'
import AuthCard from '../components/AuthCard'

const Register: React.FC = () => {
  return (
    <div className='flex place-items-center h-screen justify-center'>
      <AuthCard isLogin={false} />
    </div>
  )
}

export default Register
