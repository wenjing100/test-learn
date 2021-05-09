import { axrequest } from './request'


async function getgoodsList(pload) {
  let { pageSize, pageIndex, sortType, hotPoint, cat } = pload;
  let params = null;
  if (!cat && !hotPoint) {
    params = {
      pageSize,
      pageIndex,
      sortType,
    }
  }else{
    if(cat && !hotPoint){
      params = {
        pageSize,
        pageIndex,
        sortType,
        cat
      }
    }else if(!cat && hotPoint){
      params = {
        pageSize,
        pageIndex,
        sortType,
        hotPoint
      }
    }else{
      params = {
        pageSize,
        pageIndex,
        sortType,
        cat,
        hotPoint
      }
    }
  }
  let option = {
    method: 'get',
    url: '/api/home/multidata/list',
    params
  }
  let res = (await axrequest(option)).data.data;
  return res
}
async function getrecomList(pageSize = 16, pageIndex = 1, sortType = '') {
  let option = {
    method: 'get',
    url: '/api/home/multidata/recom',
    params: {
      pageSize,
      pageIndex,
      sortType,
    }
  }
  let res = await axrequest(option);
  return res
}

export {
  getgoodsList,
  getrecomList
}