import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN, REGISTER } from '../utils/endpoint';
import Fetcher from '../utils/fetcher';

const AuthCard: React.FC<{isLogin: boolean}> = ({ isLogin }) => {
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState('')

  const submission = useCallback((e:any /* to make eslint happy */) => {
    e.preventDefault()

    const emailInput = e.target.email.value
    const passwordInput = e.target.password.value

    let payload: any = {
      email: emailInput,
      pasword: passwordInput,
    }

    if (isLogin) {
      payload = {
        ...payload,
        name: e.target.name.value,
      }
    }

    const endpoint = isLogin ? LOGIN : REGISTER
    const result = Fetcher.post(endpoint).withJsonPayload(payload).fetchResult()

    result.then((data: any) => {
      if (data.error) {
        setErrorMsg(data.error)
      } else {
        localStorage.setItem('token', data.token)
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
            <label htmlFor="name">Name:</label>
            <input type='text' id='name' name='name' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-1.5 mb-3' />
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
