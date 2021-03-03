import { IcarData_item, Istate } from '@/typings'
import { SET_CARDATA } from './actionTypes'


export default {
    [SET_CARDATA](state:Istate,cardata:[IcarData_item]){
        state.carData = cardata
    }
}