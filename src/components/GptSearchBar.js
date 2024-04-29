import React, { useRef } from 'react'
import lang from '../utils/langConstant'
import { useDispatch, useSelector } from 'react-redux'
import { API_OPTIONS } from '../utils/constants';
import { faLaptopHouse } from '@fortawesome/free-solid-svg-icons';
import { addGptMovieResult } from '../utils/gptSlice';
import openAI from '../utils/openAI';

const GptSearchBar = () => {
    const dispatch =useDispatch();
    const langKey =useSelector((store) => store.config.lang);
    const searchText =useRef(null);
    const searchMovieTMDB = async (movie)=>{
      const data = await fetch(
        'https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1',API_OPTIONS
      )
      const json = await data.json();
      return json.results;
    }
      const handleGptSearchClick = async()=>{
        console.log(searchText.current.value);
        const gptQuery ="Act as Movie Recommendation system and suggest some movies foe the query"+ searchText.current.value +" . only give me names of 5 movies ,comma seperated like the example result given ahead . Example Result :Gadar,Sholay,Golmaal,Don,Koi mil Gaya "
      const gptResults=  await openAI.chat.completions.create({
          messages: [{ role: 'user', content: gptQuery }],
          model: 'gpt-3.5-turbo',
        });
      
          const gptMovies =gptResults.choices?.[0]?.message?.content.split(",")
          const promiseArray =gptMovies.map((movie)=>searchMovieTMDB(movie));
          const tmdbResults= await Promise.all(promiseArray);
          console.log(gptMovies);
          console.log(tmdbResults);
          dispatch(addGptMovieResult({movieNames:gptMovies,movieResults:tmdbResults}))
          
          
      }
  return (
    <div className='  pt-[35%] md:pt-[10%] flex justify-center'>
        <form className =' w-full bg-black grid grid-cols-12 md:w-1/2 ' onSubmit={(e)=>e.preventDefault()}>
            <input type="text" ref={searchText}
            placeholder={lang[langKey].gptSearchBarPlaceholder}
            className=' p-4 m-4 col-span-9'
            />
            <button onClick={handleGptSearchClick} className='bg-red-700  py-2 px-4 m-4 col-span-3 text-white rounded-lg'>
                {lang[langKey].search}
            </button>
        </form>
    </div>
  )
}

export default GptSearchBar