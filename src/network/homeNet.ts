import { axrequest } from './request'


    async function gethomeMulti(){
        let option = {
            method:'get',
            url:'/api/home/multidata'
        }
        let res = await axrequest(option)
        return res
    }
 

export {
    gethomeMulti
}