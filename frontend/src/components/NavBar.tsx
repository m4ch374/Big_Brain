import React, { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGOUT } from '../utils/endpoint';
import Fetcher from '../utils/fetcher';
import Globe from './icons/Globe';

const NavBar: React.FC = () => {
  const navigate = useNavigate()

  const logout = useCallback(() => {
    Fetcher.post(LOGOUT).withLocalStorageToken().fetchResult()
    localStorage.removeItem('token')
    navigate('/login')
  }, [])

  return (
    <nav className='bg-[#2c2c2c] py-1 px-2 flex justify-between items-center'>
      <Link to='/' aria-label='To dashboard' className='flex text-xl items-center gap-3'>
        <Globe />
        Big brain
      </Link>

      <button type='button' onClick={logout} className='border-[1px] text-red-500 border-red-500 px-2 py-1 rounded-md'>
        Logout
      </button>
    </nav>
  )
}

export default NavBar
