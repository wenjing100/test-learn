import { axrequest } from './request'

async function gethomeMulti() {
  let option = {
    method: 'get',
    url: '/api/home/multidata/first'
  }
  let res = await axrequest(option);
  let homeData = {
    bannerList:res.data.data.banner.list,
    recommend:res.data.data.recommend.list,
    thisweek:res.data.data.thisWeek,
  }
  return homeData
}

export {
  gethomeMulti
}
