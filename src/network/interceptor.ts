import axios from 'axios';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { LOG_OUT } from '@/store/actionTypes';

const store = useStore();
const router = useRouter();

export default ()=>{
  //请求拦截  给每次请求头 加上token
  axios.interceptors.request.use(config=>{
    let token = localStorage.getItem('token');
    console.log('拦截');
    if(token){
      //bearer token 规范 jwt
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  })
  //响应拦截，在token 失效，服务器返回401时候
  axios.interceptors.response.use(null,err=>{
    if(err.response.status === 401){//没有登陆或者令牌过期
      //清空本地token
      console.log('清空token')
      store.dispatch(LOG_OUT);
      //跳转login
      router.replace('/login')
    }
  })
}

