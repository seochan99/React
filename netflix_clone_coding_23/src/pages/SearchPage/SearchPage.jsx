import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./style";
import { useDebounce } from "../../hooks/useDebounce";

function SearchPage() {
    const navigate = useNavigate();
    const [searchResult, setsearchResult] = useState([]);

    console.log(useLocation());

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    let query = useQuery();
    console.log(query);
    const searchTerm = query.get("q"); //q에 있는걸 가져온다.
    console.log(searchTerm);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // useEffect를 통해 searchTerm이 바뀔때마다 fetchSearchMovie를 실행한다.
    // useEffect(() => {
    //     if (searchTerm) {
    //         fetchSearchMovie(searchTerm);
    //     }
    // }, [searchTerm]);

    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchSearchMovie(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    // 영화 검색 함수
    const fetchSearchMovie = async (searchTerm) => {
        try {
            const request = await axios.get(
                `/search/multi?include_adult=false&query=${searchTerm}`
            );
            console.log(request);
            console.log(searchResult);
            setsearchResult(request.data.results);
            console.log(searchResult);
        } catch (error) {
            console.log("ERROR", error);
        }
    };

    // 검색 결과 렌더링 함수
    const renderSearchResults = () => {
        return searchResult.length > 0 ? (
            <S.SearchContainer>
                {searchResult.map((movie) => {
                    if (
                        movie.backdrop_path !== null &&
                        movie.media_type !== "person"
                    ) {
                        const movieImageUrl =
                            "https://image.tmdb.org/t/p/w500" +
                            movie.backdrop_path;
                        return (
                            <S.Movie key={movie.id}>
                                <S.MovieColumnPoster
                                    onClick={() => navigate(`/${movie.id}`)}
                                >
                                    <S.MoviePoster
                                        src={movieImageUrl}
                                        alt="movie"
                                    />
                                </S.MovieColumnPoster>
                            </S.Movie>
                        );
                    }
                })}
            </S.SearchContainer>
        ) : (
            <S.NoResults>
                <S.NoResultTextWrapper>
                    찾고자하는 검색어"{debouncedSearchTerm}"에 맞는 영화가
                    없습니다.
                </S.NoResultTextWrapper>
            </S.NoResults>
        );
    };

    return <S.SearchContent>{renderSearchResults()}</S.SearchContent>;
}

export default SearchPage;
