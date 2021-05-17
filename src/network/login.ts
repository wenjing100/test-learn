import { axrequest, } from './request'
//登陆
async function mallLogin(un,psw){
  let option = {
    method:'post',
    url:'/api/user/login',
    params:{
      un,
      psw
    }
  }
  let res = (await axrequest(option)).data
  return res
}

// 登陆验证
async function checkLogStatus(un){
  let option = {
    method:'post',
    url:'/api/user/verify',
    params:{
      un,
    }
  }
  let res = (await axrequest(option)).data;
  console.log(res)
  return res
}

export {
  mallLogin,
  checkLogStatus
}
