import axios from '../api/axios';
import React, { useState,useEffect } from 'react'
import requests from '../api/requests';
import "./Banner.css"
import styled from "styled-components";

export default function Banner() {

const [movie, setMovie] = useState([]);
const [isClicked, setIsClicked] = useState(false);


useEffect(() => {
    fetchData(); 
},[])


// async, await 비동기로 요청보냄 
// 기다리지않고 넣으니 pending상태  
const fetchData = async () => {

    // 현재 상영중인 영화 정보 가져오기 
    const request = await axios.get(requests.fetchNowPlaying); 

    // 여러 영화 중 영화 하나의 id를 가져오기
    const movieId = request.data.results[
        Math.floor(Math.random() * request.data.results.length)
    ].id;

    //특정 영화의 더 상세한 정보 가져오기 
    const {data : movieDetail} = await axios.get(`movie/${movieId}`,{
        params:{append_to_response:"videos"},
    });
    setMovie(movieDetail)
    
}

const truncate = (str,n)=>{
    return str?.length > n ? str.substr(0,n-1) + "...": str 
}

if(!isClicked){
  return <header
  className='banner'
  style={{backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
  backgroundPosition : "top center",
  backgroundSize : "cover",
}}
  >
    <div className='banner__contents'>
        <h1 className='banner_title'>
            {movie.title || movie.name || movie.original_name}
        </h1>

        <div className='banner__buttons'>
            <button className='banner__button play' onClick={() => setIsClicked(true)}>Play</button>
            <button className='banner__button info'>More Information</button>
        </div>
        <h1 className='banner__description'>{truncate(movie?.overview,100)}</h1>
    </div>
    <div className='banner--fadeBottom'></div>

  </header>
}else{
    return(
        <Container>
            <homeContainer>
            clicked
            </homeContainer>
        </Container>
    )
}
}

const Container = styled.div`
    display: flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    width : 100%;
    height : 100vh;
`

const homeContainer = styled.div`
    width : 100%;
    height : 100%;
`