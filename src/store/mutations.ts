import { Istate, IviewCartItem } from '@/typings'
import { SET_CARDATA, SET_NUM_ADD, SET_NUM_SUB, SET_CARDATA_CHECK, GET_CARDATA, ALL_CHECKED } from './actionTypes';
import _ from 'lodash';
import { addLocalStorage } from '@/hooks/cartLocalStorage';


export default {
  [SET_CARDATA](state: Istate, cardata: IviewCartItem) {
    let has = false;
    state.cartData.forEach(item => {
      if (item.gid == cardata.gid) {
        item.num ++;
        has = true;
      }
    })
    if(!has){
     state.cartData.push(cardata); 
    }
  },
  [GET_CARDATA](state: Istate, cardatalist){
    state.cartData = cardatalist;
    // addLocalStorage();
  },
  [SET_NUM_ADD](state: Istate, gid: string,) {
    state.cartData.forEach(item => {
      if (item.gid == gid) {
        item.num ++;
      }
    });
  },
  [SET_NUM_SUB](state: Istate, gid: string,){
    state.cartData.forEach(item => {
      if (item.gid == gid) {
        item.num --;
      }
    });
  },
  [SET_CARDATA_CHECK](state: Istate, pload){
    let {gid,status} = pload;
    let k = 1;
    state.cartData.forEach(item => {
      if (item.gid == gid) {
        item.checked = status;
      }
      if(item.checked == 0){
        k = 0;
      }
    });
    if(k){
      state.isAllchecked = 1;
    }
  },
  [ALL_CHECKED](state: Istate, status){
    state.isAllchecked = status == 1? 1: 0;
    state.cartData.forEach(item => {
      item.checked = status;
    });
  },
}