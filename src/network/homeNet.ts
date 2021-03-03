import { axrequest } from './request'

function homedata(){
    async function gethomeMulti(){
        let option = {
            method:'get',
            url:'/api/home/multidata'
        }
        let res = await axrequest(option)
        return res
    }
    return {gethomeMulti}
}

export default homedata