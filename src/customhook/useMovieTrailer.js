import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addMovieTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";
import { UseSelector } from "react-redux";


const useMovieTrailer= (movieID)=>{
    const dispatch=useDispatch();
    const trailerVideo = useSelector(store => store.movie.trailerVideo)
    const getMovieVideo = async () =>{
        const data = await fetch("https://api.themoviedb.org/3/movie/"+movieID+"/videos?language=en-US",API_OPTIONS);
        const json = await data.json();
        const filterData =json.results.filter((video)=> video.type==="Trailer");
        const trailer = filterData.length ? filterData[0]:json.results[0];
           dispatch(addMovieTrailerVideo(trailer));
         
      }
      useEffect(()=>{
      !trailerVideo &&  getMovieVideo();
      },[])
}

export default useMovieTrailer;