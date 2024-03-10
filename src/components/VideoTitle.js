import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faPlay } from '@fortawesome/free-solid-svg-icons'

const VideoTitle = ({title,overview}) => {

  return (
          <div className='w-screen aspect-video pt-[20%] md:pt-[15%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black'>
            <h1 className='text-xl md:text-4xl font-bold '>{title}</h1>
            <p className='hidden md:inline-block py-6 text-lg w-1/4'>{overview}</p>
            <div className='my-4 md:m-0'>
              <button className='bg-white text-black py-1 md:py-2 px-3 md:px-8 text-xl rounded-lg hover:bg-opacity-80'>
                <FontAwesomeIcon icon={faPlay} />
                <span className='px-1'>   Play</span>
              </button>
              <button className='hidden md:inline-block mx-2 bg-gray-500 text-white py-2 px-8 text-xl bg-opacity-50 rounded-lg'>
                <FontAwesomeIcon icon={faCircleExclamation} />
                <span className='px-1'>  More Info </span>
              </button>
            </div>
          </div>
  )
}

export default VideoTitle;
