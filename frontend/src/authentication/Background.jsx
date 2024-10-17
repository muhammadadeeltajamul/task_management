import React from 'react';

const Background = ({ children }) => {
  return (
    <div className='d-flex'>
      <div className='z-index-2 h-100 mx-auto mt-4r bg-aliceblue'>
        <div className='pt-2r px-4r'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Background;