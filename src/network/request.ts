import axios from 'axios';
import store from '@/store';
import { LOG_OUT } from '@/store/actionTypes';
import router from '@/router';

async function axrequest(config:Object){
    //创建axios实例
    const instance = axios.create({
        baseURL:'http://localhost:3000',//'http://localhost:3000' 'http://47.110.38.241'
        timeout:5000,
        withCredentials:false
    })
    // instance.interceptors.response.use(res=>{
    //     return res.data 
    // },err=>{
    //     console.log(err)
    // })

    //请求拦截，添加token
    instance.interceptors.request.use(config=>{
        let token = localStorage.getItem('token');
        if(token){
          //bearer token 规范 jwt
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
    },err=>{
        console.log('拦截 出错'+err)
    })
    //响应拦截，在token 失效，服务器返回401时候
    instance.interceptors.response.use(null,err=>{
    if(err.response.status === 401){//没有登陆或者令牌过期
      //清空本地token
      console.log('失效情况---清空token')
      store.dispatch(LOG_OUT);
      //跳转login
    //   router.replace('/login')
    }
  })
    return instance(config);
}

export {
    axrequest,
}