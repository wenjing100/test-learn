import { Istate, IviewCartItem } from '@/typings'
import { SET_CARDATA, SET_NUM_ADD, SET_NUM_SUB, SET_CARDATA_CHECK, GET_CARDATA, ALL_CHECKED, COUNT_SELECTNUM, COUNT_TOTALPRICE, DEL_ITEM, CAT_CURRENT, SET_VIEWPORT, TOKEN_FROM_LOCAL, LOGIN, LOG_OUT } from './actionTypes';
import _ from 'lodash';
import { mallLogin } from '@/network/login';
// import { addLocalStorage } from '@/hooks/cartLocalStorage';

export default {
  [SET_CARDATA](state: Istate, cardata: IviewCartItem) {
    let has = false;
    state.cartData.forEach(item => {
      if (item.gid == cardata.gid) {
        item.num++;
        has = true;
      }
    })
    if (!has) {
      state.cartData.push(cardata);
    }
  },
  [GET_CARDATA](state: Istate, cardatalist) {
    state.cartData = cardatalist;
    // addLocalStorage();
  },
  [SET_NUM_ADD](state: Istate, gid: string,) {
    state.cartData.forEach(item => {
      if (item.gid == gid) {
        item.num++;
      }
    });
  },
  [SET_NUM_SUB](state: Istate, gid: string,) {
    state.cartData.forEach(item => {
      if (item.gid == gid) {
        item.num--;
      }
    });
  },
  [SET_CARDATA_CHECK](state: Istate, pload) {
    let { gid, status } = pload;
    let k = 1;
    state.cartData.forEach(item => {
      if (item.gid == gid) {
        item.checked = status;
      }
      if (item.checked == 0) {
        k = 0;
      }
    });
    state.isAllchecked = k;
  },
  [ALL_CHECKED](state: Istate, status) {
    if (status == 1) {
      state.isAllchecked = 1;
      state.disChecked = 0;
    } else {
      state.isAllchecked = 0;
      state.disChecked = 1;
    }
    state.cartData.forEach(item => {
      item.checked = status;
    });
  },
  [COUNT_SELECTNUM](state: Istate) {
    state.selectNum = 0;
    state.cartData.forEach(item=>{
      if(item.checked === 1){
        state.selectNum ++;
      }
    })
    if(state.selectNum == state.cartData.length){
      state.isAllchecked = 1;
    }
  },
  [COUNT_TOTALPRICE](state: Istate) {
    let len = state.cartData.length;
    let sum = 0;
    for(let i = 0; i < len; i++){
      if(state.cartData[i].checked == 1){
        sum = sum + Math.round(state.cartData[i].price*100)*state.cartData[i].num;
      }
    }
    state.totalPrice = sum/100;
  },
  [DEL_ITEM](state: Istate, gid:string) {
    let i = 0 ;
    for(let j = 0; j < state.cartData.length; j++){
      if(state.cartData[j].gid === gid){
        i = j;
        break;
      }
    }
    state.cartData.splice(i,1);
  },
  [CAT_CURRENT](state: Istate, n:number) {
    state.cat_current = n;
  },
  [SET_VIEWPORT](state: Istate, n:number) {
    state.viewport_height = n;
  },
  [TOKEN_FROM_LOCAL](state: Istate, islogin:boolean) {
    state.is_login = islogin;
    
  },
  [LOGIN](state: Istate, pload) {
    const { un,islogin } = pload;
    state.userName = un;
    state.is_login = islogin;
  },
  [LOG_OUT](state: Istate) {
    state.is_login = false;
    state.userName = '';
  },
}