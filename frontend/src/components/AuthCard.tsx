import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN, REGISTER } from '../utils/endpoint';
import Fetcher from '../utils/fetcher';
import { IResAuth } from '../types';

const AuthCard: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState('')

  const submission: React.FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault()

    const formInput = e.currentTarget

    const emailInput = formInput.email.value
    const passwordInput = formInput.password.value
    const nameInput = formInput.usrName ? formInput.usrName.value : ''

    const payload = {
      email: emailInput,
      pasword: passwordInput,
      name: nameInput,
    }

    const endpoint = isLogin ? LOGIN : REGISTER
    const result = Fetcher.post(endpoint).withJsonPayload(payload).fetchResult() as Promise<IResAuth>

    result.then((data) => {
      if (data.error) {
        setErrorMsg(data.error)
      } else {
        localStorage.setItem('token', data.token as string)
        navigate('/')
      }
    })
  }, [])

  return (
    <div className='bg-slate-50 text-gray-900 min-w-[250px] w-[30%] max-w-[500px] flex flex-col justify-center p-4 rounded-lg'>
      <h1 className='font-bold text-3xl place-self-center'>{isLogin ? 'Login' : 'Register'}</h1>

      <form onSubmit={submission} className='flex flex-col'>
        <label htmlFor='email'>Email:</label>
        <input type='email' id='email' name='email' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-1.5 mb-3' />

        <label htmlFor='password'>Password:</label>
        <input type='password' id='password' name='password' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-1.5 mb-3' />

        {!isLogin &&
          <>
            <label htmlFor="usrName">Name:</label>
            <input type='text' id='usrName' name='usrName' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-1.5 mb-3' />
          </>
        }

        {errorMsg !== '' && <label className='text-sm text-red-500 mb-2'>{errorMsg}</label>}
        <Link to={isLogin ? '/register' : '/login'} className='text-sm underline text-blue-600 mb-2'>
          {isLogin ? 'No account? Register Here!' : 'Have an account? Login Here!'}
        </Link>

        <button type='submit' className='bg-blue-500 text-white py-1 px-5 rounded-lg place-self-end'>
          Go
        </button>
      </form>
    </div>
  )
}

export default AuthCard
