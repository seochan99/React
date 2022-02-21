import axios from '../api/axios';
import requests from "../api/request";
import React,{useState, useEffect} from 'react'

export default function Banner() {
    const [movie, setMovie] = useState([]);
    useEffect(() => {
      fetchData();

    }, [])
    
    const fetchData =async ()=>{
        //현재 상영중인 영화 정보 가져오기 
        const request = await axios.get(requests);
        //await을 하지 않고 넣으면 pending 상태가 되어버린다 

        //여러 영화 중 영화 하나의 ID 가져오기 
        const movieId = request.data.results[Math.floor(Math.random()*request.data.results.length)].id;

        //특정 영화의 더 상세한 정보 가져오기(비디오 정보도 포함)
        const {data: movieDetail} = await axios.get(`movie/${movieId}`,{
            params:{append_to_respons : "videos"}, // movieDetail안에 영화정보들을 넣는다. 
        });
        setMovie(movieDetail); //안에 다 들어간당 
    };
    const truncate = (str,n)=>{
        return str?.length > n ? str.substr(0,n-1) + "...": str 

    }

   return <header
   className='banner'
   style={{backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
   backgroundPosition : "top center",
   backgroundSize : "cover",
}}
   >
    <div className='banner__contents'>
        <h1 className='banner_title'>{movie.title || movie.name || movie.original_name}</h1>

        <div className='banner__buttons'>
            <button className='banner__button play'>Play</button>
            <button className='banner__button info'>More Information</button>
        </div>
        <h1 className='banner__description'>{truncate(movie.overview,100)}</h1>
    </div>
    <div className='banner--fadeBottom'></div>

  </header>
}
