import axios from 'axios'

async function axrequest(config:Object){
    //创建axios实例
    const instance = axios.create({
        baseURL:'http://localhost:3000',//'http://localhost:3000' 'http://47.110.38.241'
        timeout:5000,
        withCredentials:false
    })
    //响应拦截
    // instance.interceptors.response.use(res=>{
    //     return res.data 
    // },err=>{
    //     console.log(err)
    // })

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
    return instance(config);
}

export {
    axrequest,
}