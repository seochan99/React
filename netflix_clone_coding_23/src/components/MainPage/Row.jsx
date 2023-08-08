import { useEffect, useState } from "react";
import axios from "../../api/axios";
import MovieModal from "../MovieModal/MovieModal";
import {
    RowContainer,
    RowPosters,
    RowPoster,
    RowTitle,
    SwiperPagination,
    SwiperBtnPrev,
    SwiperBtnNext,
} from "./Styled";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css"; // Swiper의 기본 스타일
import "swiper/css/navigation"; // 네비게이션 버튼 스타일
import "swiper/css/pagination"; // 페이지네이션 스타일
import "swiper/css/scrollbar";

export default function Row({ isLarge, title, id, fetchUrl }) {
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
        setModalOpen(true); //모달 오픈이 트루
        setMovieSelected(movie);
    };

    return (
        <>
            {modalOpen && (
                <MovieModal {...movieSelected} setModalOpen={setModalOpen} /> //컴포넌트 가져오기
            )}
            <RowContainer>
                <RowTitle>{title}</RowTitle>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    navigation
                    pagination={{ clickable: true }}
                    loop={true}
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
                    <RowPosters>
                        {movies.map((movie) => (
                            <SwiperSlide key={movie.id}>
                                <RowPoster
                                    key={movie.id}
                                    isLarge={isLarge ? "true" : "false"}
                                    src={`https://image.tmdb.org/t/p/original/${
                                        isLarge
                                            ? movie.poster_path
                                            : movie.backdrop_path
                                    }`}
                                    alt={movie.name}
                                    onClick={() => handleClick(movie)}
                                />
                            </SwiperSlide>
                        ))}
                    </RowPosters>
                </Swiper>
            </RowContainer>
        </>
    );
}
