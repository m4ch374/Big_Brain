import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className='flex flex-col items-center p-10 gap-10'>
      <h1 className='text-2xl'>404 not found so sad :(</h1>
      <h3 className='text-lg text-center'>
        Maybe you want to head back to the
        <Link to={'/login'} className='text-blue-500'> login page</Link>
      </h3>
    </div>
  )
}

export default NotFound
