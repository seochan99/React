import './Banner.css';
import { useState, useEffect } from 'react';
import requests from '../api/requests';
import axios  from '../api/axios';
import styled from 'styled-components'

const Iframe = styled.iframe`
    width: 100%;     
    height: 100%;     
    z-index: -1;
    border: none;

     &::after {
         content: '';
         position: absolute;
         top: 0;
         left: 0;
         width: 100%;
         height: 100%;
     }
 `;

 const Container = styled.div`
     display: flex;
     justify-content: center;
     align-items: center;
     flex-direction: column;
     width: 100%;
     height: 100vh;
 `;

 const HomeContainer = styled.div`
     width: 100%;
     height: 100%;
 `;

export default function Banner() {
    const [isClicked, setIsClicked] = useState(false);
    const [movie, setMovie] = useState([]);

    useEffect(()=> {
        fetchData();
    }, []);

    // 영화 데이터를 fetch해서 가져오기 함수
    const fetchData = async() => {
        // 현재 상영 중인 영화 정보 가져오기
        const req = await axios.get(requests.fetchNowPlaying);
        // 여러 영화 중 영화 하나의 ID를 가져오기
        const movieId = req.data.results[
            Math.floor(Math.random() * req.data.results.length)
        ].id;
        // 가져온 영화의 상세 정보를 가져오기 (비디오 정보 포함시키기)
        const {data : movieDetail } = await axios.get(`movie/${movieId}`, {
            params : {append_to_response : "videos"},
        });
        setMovie(movieDetail);
    }

    // 설명이 길떄 잘라주는 함수
    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

    if (!isClicked){
        return (
            <header
                className='banner'
                style={{
                    backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
                    backgroundPosition : 'top center',
                    backgroundSize : 'cover'
                }}>
    
                <div className='banner__contents'>
                    <h1 className='banner_title'>
                        {movie.title || movie.name || movie.original_name}
                    </h1>
                    <div className='banner__buttons'>
                        <button
                            className='banner__button play'
                            onClick={() => setIsClicked(prev => !prev)}>
                            Play
                        </button>
                        <button className='banner__button info'>More Info</button>
                    </div>
                    <h1 className='banner__description' >{truncate(movie?.overview, 100)}</h1>
                </div>
                <div className='banner--fadeBottom'></div>
            </header>
        );
    }else {
        return (
            <Container>
                <HomeContainer>
                    <Iframe
                        width="640"
                        height = "360"
                        src={
                            `https://www.youtube.com/embed/${movie.videos.results[0].key}?
                            controls=&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`
                        }
                        title = "YouTube video player"
                        frameBorder="0"
                        allow = "autoplay; fullscreen"
                        allowfullscreen>
                    </Iframe>
                </HomeContainer>
            </Container>
        )
    }
}

