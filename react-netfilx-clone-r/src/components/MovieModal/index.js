import React, { useRef, useEffect } from 'react';
import "./MovieModal.css";

function MovieModal({
    backdrop_path,
    title,
    overview,
    name,
    release_date,
    first_air_date,
    vote_average,
    setModalOpen
}){

    // const [menuBtnClick, setMenuBtnClick] = useState(false);
    const outSection = useRef(); // 모달창 영역 밖에 해당하는 부분 useRef을 통해 선택
    useEffect(() => {
        document.addEventListener('mousedown',handleClickOutside);
    
      return () => {
        document.removeEventListener('mousedown',handleClickOutside);
      }
    })
    const handleClickOutside=(e)=>{
        if(outSection && !outSection.current.contains(e.target)){
            setModalOpen(false);
            console.log("밖 선택");
        }
        else{
            setModalOpen(true);
            console.log("안 선택");
        }
    }
    


    return <div className="presentation">
        <div className='wrapper-modal'>
            <div ref={outSection} className='modal'>



                
                <span onClick={()=> setModalOpen(false)} className='modal-close'>
                    X
                </span>

                <img 
                    className='modal__poster-img'
                    src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                    alt="modal__poster-img"
                />
                <div className='modal__content'>
                    <p className='modal__details'>
                        <span className='modal__user_perc'>
                            100% for you 
                        </span>
                        {release_date ? release_date : first_air_date}
                    </p>
                    <h2 className='modal__title'>{title? title : name}</h2>
                    <p className='modal__overview'>평점 : {vote_average}</p>
                    <p className='modal__overview'>{overview}</p>
                </div>
            </div>
        </div>

    </div>;
}

export default MovieModal;