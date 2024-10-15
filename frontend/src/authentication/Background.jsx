import React from 'react';

const Background = ({ children }) => {
  return (
    <div className='d-flex h-100'>
      <div className='z-index-2 mx-auto mt-4r bg-aliceblue'>
        <div className='pt-2r pb-4r px-4r'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Background;