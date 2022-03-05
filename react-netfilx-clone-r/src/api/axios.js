import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params:{
        api_key:"b1e1a6c6195bd0f36adddb589e1bde7d",
        language:"ko-KR",
    },
});

export default instance; //이 파일 밖에서도 사용가능하게 함 