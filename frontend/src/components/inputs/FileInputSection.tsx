import React from 'react';

const FileInputSection: React.FC<{ identifier: string }> = ({ identifier }) => {
  return (
    <input
      aria-describedby='file-input'
      id={identifier}
      name={identifier}
      type="file"
      className="block
        w-full
        text-sm
        border
        rounded-lg
        cursor-pointer
        text-gray-400
        focus:outline-none
        bg-[#2c2c2c]
        border-gray-600
        placeholder-gray-400
        file:bg-[#3f3f3f]
        file:text-white
        file:border-0
        file:border-r-[1px]
        file:border-gray-400
        file:py-2.5"
        />
  )
}

export default FileInputSection
