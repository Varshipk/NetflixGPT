import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addWebSeries } from "../utils/movieSlice";
import { useEffect } from "react";


const useWebSeries =()=>{
    const dispatch=useDispatch();
    const webSeries =useSelector(store => store.movie.webSeries)
    const getWebSeries = async ()=>{
      const data= await fetch('https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1',API_OPTIONS);
      const json =await data.json();
      dispatch(addWebSeries(json.results))

    }
    useEffect(()=>{
    !webSeries &&   getWebSeries();
    },[])
}
export default useWebSeries;