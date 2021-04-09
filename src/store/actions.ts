import { ALL_CHECKED, GET_CARDATA, SET_CARDATA, SET_CARDATA_CHECK, SET_NUM_ADD, SET_NUM_SUB } from './actionTypes';
import { Commit, mapActions } from 'vuex';
import { Istate, IviewCartItem } from '../typings';
import { getCartList, CartList_add, CartList_sub, setCheck, AddTocart, allCheck } from '@/network/cartNet';

interface ICtx {
    commit: Commit,
    state : Istate
}

// 模拟使用的用户b_id vght1c 
const BID = 'vght1c';

export default {
    //加入购物车
    async [SET_CARDATA]({commit}:ICtx,pload){
      let { bid, gid, num} = pload;
      bid = BID;
      await AddTocart(gid,bid,num);
      commit(SET_CARDATA,pload);
    },
    //获取购物车列表
    async [GET_CARDATA]({commit}:ICtx,bid:string){
      bid = BID;
      let dd = await getCartList(bid);
      let productList = [];
      dd.data?.forEach(prod => {
        let {g_id,goods_num,g_name,price,top_imgs,g_status} = prod;
        productList.push({
          gid:g_id,
          faceimg:top_imgs.split(',')[0],
          gname:g_name,
          price,
          num:goods_num,
          checked:g_status
        })
      });
      commit(GET_CARDATA,productList);
    },
    // add
    async [SET_NUM_ADD]({commit}:ICtx,pload){
      let bid = BID;
      let { gid, num } = pload;
      await CartList_add(gid,bid,num);
      commit(SET_NUM_ADD,gid);
    },
    // sub
    async [SET_NUM_SUB]({commit}:ICtx,pload){
      let bid = BID;
      let { gid, num } = pload;
      await CartList_sub(gid,bid,num);
      commit(SET_NUM_SUB,gid);
    },
    async [SET_CARDATA_CHECK]({commit}:ICtx,pload){
      let bid = BID;
      let { gid, status } = pload;
      await setCheck( gid, bid, status);
      commit(SET_CARDATA_CHECK,{gid,status});
    },
    async [ALL_CHECKED]({commit}:ICtx,status){
      let bid = BID;
      await allCheck( bid, status);
      commit(SET_CARDATA_CHECK,status);
    },

}