import React from 'react';
import AuthCard from '../components/AuthCard';

const Login: React.FC = () => {
  return (
    <div className='flex place-items-center h-screen justify-center'>
      <AuthCard isLogin={true} />
    </div>
  )
}

export default Login
