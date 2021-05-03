import { axrequest } from './request'


    async function getgoodsList(pload){
        let { pageSize,pageIndex,sortType,hotPoint,cat} = pload;
        let option = {
            method:'get',
            url:'/api/home/multidata/list',
            params:{
                pageSize,
                pageIndex,
                sortType,
                hotPoint,
                cat
            }
        }
        let res = await axrequest(option);
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
        let res = await axrequest(option);
        return res
    }

export {
    getgoodsList,
    getrecomList
}