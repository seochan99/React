import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params:{
        api_key:"7944d8fc4d5101d1a365846c5e11eeb4",
        language: "ko-KR",
    },
});

export default instance;