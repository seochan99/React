import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import "./Row.css";


export default function Row({isLargeRow, title, id, fetchUrl}){
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        fetchMovieData();
    },[fetchUrl]);

    const fetchMovieData = async () => {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
    };


    return(
    <section className="row">
        <h2>{title}</h2>
        <div className='slider'>
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
            <div id={id} className="row__posters">
                {movies.map((movie) => (
                    <img
                        key={movie.id}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path: movie.backdrop_path}`}
                        loading ="lazy"
                        alt={movie.name}
                    />
                ))}
            </div>
            <div 
                className='slider__arrow-right'
                onClick={()=>{ //스크롤 기능(오)
                    document.getElementById(id).scrollLeft += window.innerWidth - 80;
                }}>
                <span 
                className='arrow'
                
                >{">"}</span>
            </div>
        </div>
    </section>
    )
}
