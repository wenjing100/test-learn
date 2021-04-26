import axios from 'axios';

//请求拦截  给每次请求头 加上token
export default ()=>{
  axios.interceptors.response.use(config=>{
    let token = localStorage.getItem('token');
    if(token){
      config.headers.token = token;
    }
    return config;
  })
}

