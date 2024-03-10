import { createSlice } from "@reduxjs/toolkit";



const movieSlice =createSlice({
    name:"movies",
    initialState:{
        nowPlayingMovies:null,
        popularMovies:null,
        topRatedMovies:null,
        upcomingMovies:null,
        trailerVideo:null,
        webSeries:null,
    },
    reducers:{
        addNowPlayingMovies:(state,action)=>{
           state.nowPlayingMovies=action.payload; 
        },
        addPopularMovies:(state,action)=>{
            state.popularMovies =action.payload;
        },
        addTopRatedMovies:(state,action)=>{
            state.topRatedMovies=action.payload;
        },
        addUpcomingMovies:(state,action)=>{
            state.upcomingMovies=action.payload;
        },
        addMovieTrailerVideo:(state,action)=>{
               state.trailerVideo=action.payload; 
        },
        addWebSeries:(state,action)=>{
            state.webSeries=action.payload; 
     }
    }
})

export const {addNowPlayingMovies,addMovieTrailerVideo,addPopularMovies,addTopRatedMovies,addUpcomingMovies,addWebSeries}=movieSlice.actions;
export default movieSlice.reducer;