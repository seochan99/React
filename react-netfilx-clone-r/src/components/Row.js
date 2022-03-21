import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import MovieModal from './MovieModal';
import "./Row.css";



import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
import {Swiper, SwiperSlide} from 'swiper/react';



export default function Row({isLargeRow, title, id, fetchUrl}){

    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});

    useEffect(() => {
        fetchMovieData();
    },[fetchUrl]);

    const fetchMovieData = async () => {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
    };
    

    const handleClick = (movie) =>{
        setModalOpen(true) //모달 오픈이 트루 
        setMovieSelected(movie);

    }

    return(
    
    <section className="row">    
        <h2>{title}</h2>
        <Swiper onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)} className='slider'>
        

            <div
                className='slider__arrow-left'               
                onClick={()=>{ //스크롤 기능(완)
                        document.getElementById(id).scrollLeft -= window.innerWidth - 80;
                    }}>
                <span
                    className='arrow' 

                    >
                        {"<"}
                </span>
            </div>

            <SwiperSlide id={id} className="row__posters">
                {movies.map((movie) => (
                    <img
                        key={movie.id}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path: movie.backdrop_path}`}
                        loading ="lazy"
                        alt={movie.name}
                        onClick={()=> handleClick(movie)}
                    />
                    ))}
            </SwiperSlide>

            <div 
                className='slider__arrow-right'
                onClick={()=>{ //스크롤 기능(오)
                    document.getElementById(id).scrollLeft += window.innerWidth - 80;
                }}>
                <span 
                className='arrow'
                
                >{">"}</span>
            </div>
        </Swiper>
        {
            modalOpen && ( //모달 오픈시 
                <MovieModal {...movieSelected} setModalOpen={setModalOpen} /> //컴포넌트 가져오기 
            )
        }
    </section>
    )
}