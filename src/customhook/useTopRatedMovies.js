import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMovies } from "../utils/movieSlice";
import { useEffect } from "react";


const useTopRatedMovies =()=>{
    const dispatch=useDispatch();
    const topRatedMovies =useSelector( store =>store.movie.topRatedMoviesMovies)
  
    const getNowPlayingMovies = async ()=>{
      const data= await fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1',API_OPTIONS);
      const json =await data.json();
      dispatch(addTopRatedMovies(json.results))

    }
    useEffect(()=>{
     !topRatedMovies  && getNowPlayingMovies();
    },[])
}
export default useTopRatedMovies;