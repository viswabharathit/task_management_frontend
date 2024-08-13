import React from 'react';

const Inputdata = ({ onClose }) => {
  return (
    <>
      <div className='fixed top-0 left-0 bg-gray-500 opacity-80 h-screen w-full'></div>
      <div className='fixed top-0 left-0 flex items-center justify-center h-screen w-full'>
        <div className='w-2/6 bg-gray-900 p-4 rounded relative'>
          <button onClick={onClose} className='absolute top-2 right-2 text-white'>
            X
          </button>
          <input 
            type="text" 
            placeholder='Title'
            name="title" 
            className='px-3 py-2 rounded w-full bg-gray-500'/>
          <textarea
            name="Description"
            cols="30"
            rows="10"
            placeholder="Description"
            className='px-2 py-2 rounded w-full bg-gray-500 my-3'>
          </textarea>
          <button className='px-3 py-1 border-x-blue-400 rounded text-white text-xl bg-green-500'>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Inputdata;