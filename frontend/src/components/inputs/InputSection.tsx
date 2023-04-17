import React from 'react';

// Again, eslint is preventing typescript from being typescript
const InputSection: React.FC<{ type: string, identifier: string, placeholder: string }> = ({ type, identifier, placeholder }) => {
  return (
    <input
      type={type}
      id={identifier}
      name={identifier}
      placeholder={placeholder}
      className='border
        text-sm
        rounded-lg
        block
        w-full
        p-2.5
        m-0
        bg-[#2c2c2c]
        border-gray-600
        placeholder-gray-400
        text-white
        focus:ring-blue-500
        focus:border-blue-500'
        />
  )
}

export default InputSection
