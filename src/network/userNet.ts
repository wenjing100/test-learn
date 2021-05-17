import { axrequest, } from './request'
//获取用户信息
async function fetchUser(un){
  let option = {
    method:'post',
    url:'/api/user/uinfo',
    params:{
      un,
    }
  }
  let res = (await axrequest(option)).data
  console.log(res)
  let udetails = {
    
  }
  return res
}

export {
  fetchUser
}