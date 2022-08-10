import "./Row.css";
import { useState, useEffect } from 'react';
import axios from "../api/axios";
import MovieModal from './MovieModal/index';

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./styles.css";

import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

function Row({title, id, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});

    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie);
    }

    useEffect(() => {
        fetchMovieData();
    },[fetchUrl]);

    const fetchMovieData = async () => {
        const req = await axios.get(fetchUrl);
        setMovies(req.data.results);
    };
    const BASE_URL = "https://image.tmdb.org/t/p/original/"

    return(
        <section className="row">
            <h2>{title}</h2>
            {/* 슬라이더 */}
            <div className="slider">
                {/* 영화 여러 개를 key 값을 이용해 반복문 돌리기 */}
                <Swiper
                    slidesPerView={6}
                    scrollbar={{ draggable: true }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    mousewheel={true}
                    keyboard={true}
                    grabCursor={true}
                    slidesPerGroup={6}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                    className="mySwiper"
                >
                    {movies.map((movie) => (
                            <SwiperSlide className={`row__poster ${isLargeRow && "row__posterLarge"}`}>
                                <img
                                key={movie.id}
                                src = {`${BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                loading = "lazy"
                                alt = {movie.name}
                                onClick = {() => handleClick(movie)}/>
                            </SwiperSlide>
                    ))}
                </Swiper>
                
            </div>
            {/* 모달 넣기 */}
            {modalOpen && (
                <MovieModal 
                    {...movieSelected}
                    setModalOpen={setModalOpen}/>
            )}
        </section>
    )
}

export default Row;