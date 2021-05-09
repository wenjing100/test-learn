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
  let res = await axrequest(option)
  return res
}

// 登陆验证
async function checkLogStatus(){

  let option = {
    method:'post',
    url:'/api/user/verify',
  }
  let res = await axrequest(option)
  return res
}

export {
  mallLogin,
  checkLogStatus
}
