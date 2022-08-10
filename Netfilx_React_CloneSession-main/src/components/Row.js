import axios from '../api/axios';
import { useEffect, useState } from 'react';
import './Row.css';
import MovieModal from './MovieModal/index';

// swiper //
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Row({ title, id, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  const BASE_URL = 'https://image.tmdb.org/t/p/original/';
  return (
    <section className="row">
      <h2>{title}</h2>
      {/* 슬라이더 */}
      <Swiper
        className="slider"
        scrollbar={{ draggable: true }}
        modules={[Navigation, Scrollbar, A11y]}
        navigation
        loop={true} //끝에 갔을때 돌아오기
        breakpoints={{
          //크기별로 다르게 주기
          1378: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
      >
        {/* <div className="slider__arrow-left">
          <span className="arrow">{'<'}</span>
        </div> */}
        {/* 영화 여러 개를 key 값을 이용해 반복문 돌리기 */}
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <SwiperSlide>
              <img
                key={movie.id}
                className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                src={`${BASE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                loading="lazy"
                alt={movie.name}
                onClick={() => handleClick(movie)}
              />
            </SwiperSlide>
          ))}
        </div>
        {/* <div className="slider__arrow-right">
          <span className="arrow">{'>'}</span>
        </div> */}
      </Swiper>
      {modalOpen && <MovieModal {...movieSelected} setModalOpen={setModalOpen} />}
    </section>
  );
}

export default Row;
