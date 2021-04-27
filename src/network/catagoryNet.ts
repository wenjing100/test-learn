import { local_axrequest, axrequest } from './request'


async function getSideList() {
  let option = {
    method: 'get',
    url: '/api/catagory/side',
  }
  let res = await local_axrequest(option);
  // let res = await laxrequest(option);
  return res
}

async function fetchCat(id:number,size:number) {
  let option = {
    method: 'get',
    url: '/api/catagory',
    params:{
      id,
      size
    }
  }
  let res = await local_axrequest(option);
  // let res = await laxrequest(option);
  return res
}
async function fetchCatOne() {
  let option = {
    method: 'get',
    url: '/api/catagory/one',
  }
  let res = await local_axrequest(option);
  // let res = await laxrequest(option);
  return res
}

export {
  getSideList,
  fetchCat,
  fetchCatOne
}