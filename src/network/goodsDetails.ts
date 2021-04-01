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
 

export {
    getDetails
}