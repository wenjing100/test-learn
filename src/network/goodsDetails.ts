import { local_axrequest,axrequest } from './request'


async function getDetails(goodsiid:string){
    let option = {
        method:'get',
        url:'/api/details',
        params:{
            id:goodsiid
        }
    }
    let res = await local_axrequest(option);
    // let res = await laxrequest(option);
    return res
}
async function getShopBrief(sid:string){
    let option = {
        method:'get',
        url:'/api/details/shopbrief',
        params:{
            id:sid
        }
    }
    let res = await local_axrequest(option);
    // let res = await laxrequest(option);
    return res
}
async function getComments(goodsiid:string){
    let option = {
        method:'get',
        url:'/api/details/comments',
        params:{
            id:goodsiid
        }
    }
    let res = await local_axrequest(option);
    // let res = await laxrequest(option);
    return res
}
 

export {
    getDetails,
    getShopBrief,
    getComments
}