import {  axrequest } from './request';

//加入购物车
async function AddTocart(gid: string, bid: string, num: number) {
  let option = {
    method: 'post',
    url: '/api/cart/insert',
    params: {
      bid,
      gid,
      num
    }
  }
  let res = await axrequest(option);
  return res
}

// add商品
async function CartList_add(gid: string, bid: string, num: number) {
  let option = {
    method: 'post',
    url: '/api/cart/add',
    params: {
      bid,
      gid,
      num
    }
  }
 
  let res = await axrequest(option);
  return res
}
// sub商品数
async function CartList_sub(gid: string, bid: string, num: number) {
  let option = {
    method: 'post',
    url: '/api/cart/sub',
    params: {
      bid,
      gid,
      num
    }
  }

  let res = await axrequest(option);
  return res
}

//获取购物车列表
async function getCartList(bid: string) {
  let option = {
    method: 'get',
    url: '/api/cart',
    params: {
      bid,
    }
  }
  let res = await axrequest(option);
  return res
}

//修改选中情况
async function setCheck(bid: string, gid: string, status: number) {
  let option = {
    method: 'post',
    url: '/api/cart/status',
    params: {
      bid,
      gid,
      status
    }
  }
 
  let res = await axrequest(option);
  return res
}
//全选修改
async function allCheck(bid: string, status: number) {
  let option = {
    method: 'post',
    url: '/api/cart/statusall',
    params: {
      bid,
      status
    }
  }
 
  let res = await axrequest(option);
  return res
}
//删除购物车
async function delItem(bid: string, gid: string) {
  let option = {
    method: 'post',
    url: '/api/cart/del',
    params: {
      bid,
      gid
    }
  }
 
  let res = await axrequest(option);
  return res
}

export {
  CartList_add,
  getCartList,
  CartList_sub,
  setCheck,
  AddTocart,
  allCheck,
  delItem
}