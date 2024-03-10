import React from "react";
import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";

const GptMovieSuggestion =()=>{
    const {movieResults,movieNames}= useSelector(store=>store.gpt)
    if(!movieNames) return null;
    
    
    return (
        <div className="m-4 p-4 bg-black text-white bg-opacity-90">
        {
           movieNames.map((movieName,index) =>(
            <MoviesList 
            key={movieName} 
            title={movieName} 
            movies={movieResults[index]} />
            ) )
        }
 
    </div>
     
    )
}

export default GptMovieSuggestion;