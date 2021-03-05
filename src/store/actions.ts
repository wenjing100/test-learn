import { GET_CARDATA, SET_CARDATA } from './actionTypes'
import { Commit } from 'vuex'
import { Istate } from '../typings'
import { gethomeMulti } from '../network/homeNet'

interface ICtx {
    commit: Commit,
    state : Istate
}

export default {
    async [GET_CARDATA]({commit}:ICtx,){
        let _data = null;
        try {
            _data = await gethomeMulti();
            console.log('下一步：commit')
            commit(SET_CARDATA, _data.data.banner.list)
        } catch (error) {
            console.log(error)
        }
        
    }
}