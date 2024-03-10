import Header from './Header';
import useNowPlayingMovies from '../customhook/useNowPlayingMovies';
import usePopularMovies from "../customhook/usePopularMovies"
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import useTopRatedMovies from '../customhook/useTopRatedMovies';
import useUpcomingMovies from '../customhook/useUpcomingMovies';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';
import useWebSeries from '../customhook/useWebSeries';


const Browse = () => {

    const showGptSearch =useSelector((store) => store.gpt.showGptSearch)
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();
    useWebSeries();
  return (
    <div>
    <Header/>
    {  
           showGptSearch ? (<GptSearch/> )  : 
           (<>
             <MainContainer/>
             <SecondaryContainer />
           </>)
    }
  
    
  
    </div> 
  )
}

export default Browse;