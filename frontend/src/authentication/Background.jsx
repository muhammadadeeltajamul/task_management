import React from 'react'

const Background = ({ children }) => {
  return (
    <div className='d-flex height-100'>
      <div className='z-index-2 mx-auto mt-4r pt-2r pb-4r px-4r bg-aliceblue'>
        {children}
      </div>
    </div>
  )
}

export default Background;