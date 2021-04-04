import { local_axrequest,axrequest } from './request'


    async function getgoodsList(pageSize = 8,pageIndex = 1,sortType = '',hotPoint = '流行'){
        let option = {
            method:'get',
            url:'/api/home/multidata/list',
            params:{
                pageSize,
                pageIndex,
                sortType,
                hotPoint
            }
        }
        let res = await local_axrequest(option);
        // let res = await laxrequest(option);
        return res
    }
    async function getrecomList(pageSize = 16,pageIndex = 1,sortType = ''){
        let option = {
            method:'get',
            url:'/api/home/multidata/recom',
            params:{
                pageSize,
                pageIndex,
                sortType,
            }
        }
        let res = await local_axrequest(option);
        // let res = await laxrequest(option);
        return res
    }

export {
    getgoodsList,
    getrecomList
}