import { IcarData_item, Istate } from '@/typings'
import { SET_CARDATA } from './actionTypes'
import _ from 'lodash'


export default {
    [SET_CARDATA](state:Istate,cardata:[IcarData_item]){
        state.carData = _.cloneDeep(cardata);
        console.log(state.carData)
    }
}