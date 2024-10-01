import React from 'react'
import {ThreeCircles} from 'react-loader-spinner'

function Loading() {
  return (
    <div >
        <ThreeCircles
            type="ThreeDots"
            color="#ff9966 "
            height={50}
            width={100}
            timeout={5000}  
             
        
        />
        
        </div>
  )
}

export default Loading;