import React from 'react'
import { useSelector } from 'react-redux';
import VideoTitle from  "./VideoTitle"
import VideoBackground from "./VideoBackground"

const MainContainer = () => {
    const movie=useSelector((store)=>{
           return store.movie?.nowPlayingMovies;
    })
     if(!movie) return;
     const mainMovie=movie[0];
    
     const {original_title,overview,id} =mainMovie;

  return (
    <div className='pt-[30%]  bg-black md:pt-0'>
          <VideoTitle title={original_title} overview={overview}/>
        <VideoBackground movieId={id} />  
    </div>
  )
}

export default MainContainer;