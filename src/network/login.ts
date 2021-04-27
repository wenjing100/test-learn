import { axrequest, local_axrequest } from './request'


async function mallLogin(un,psw){
  let option = {
    method:'post',
    url:'/api/login',
    params:{
      un,
      psw
    }
  }
  let res = await axrequest(option)
  return res
}
 

export {
  mallLogin
}