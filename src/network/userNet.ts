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
  let udetails = {
    uavator:res.data[0].logo,
    uname:res.data[0].buyer_name,
    uphone:'18xxxxxxxx7'
  }
  return udetails
}

export {
  fetchUser
}