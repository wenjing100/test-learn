import { ALL_CHECKED, CAT_CURRENT, COUNT_SELECTNUM, COUNT_TOTALPRICE, DEL_ITEM, GET_CARDATA, LOGIN, LOG_OUT, SET_CARDATA, SET_CARDATA_CHECK, SET_LOGIN_STATUS, SET_NUM_ADD, SET_NUM_SUB } from './actionTypes';
import { Commit,} from 'vuex';
import { Istate,  } from '../typings';
import { getCartList, CartList_add, CartList_sub, setCheck, AddTocart, allCheck, delItem } from '@/network/cartNet';
import { mallLogin } from '@/network/login';
import { delToken, setToken } from '@/hooks/checkLogin';


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
      let productList = await getCartList(bid);
      console.log(bid)
      console.log(productList);
      commit(GET_CARDATA,productList);
      commit(COUNT_SELECTNUM);
      commit(COUNT_TOTALPRICE);
      return productList.length
    },
    // add
    async [SET_NUM_ADD]({commit}:ICtx,pload){
      let bid = BID;
      let { gid, num } = pload;
      await CartList_add(gid,bid,num);
      commit(SET_NUM_ADD,gid);
      commit(COUNT_TOTALPRICE);
    },
    // sub
    async [SET_NUM_SUB]({commit}:ICtx,pload){
      let bid = BID;
      let { gid, num } = pload;
      await CartList_sub(gid,bid,num);
      commit(SET_NUM_SUB,gid);
      commit(COUNT_TOTALPRICE);
    },
    async [SET_CARDATA_CHECK]({commit}:ICtx,pload){
      let bid = BID;
      let { gid, status } = pload;
      await setCheck( bid, gid, status);
      commit(SET_CARDATA_CHECK,{gid,status});
      commit(COUNT_SELECTNUM);
      commit(COUNT_TOTALPRICE);
    },
    async [ALL_CHECKED]({commit}:ICtx,status){
      let bid = BID;
      await allCheck( bid, status);
      commit(ALL_CHECKED,status);
      commit(COUNT_SELECTNUM);
      commit(COUNT_TOTALPRICE);
    },
    async [DEL_ITEM]({commit}:ICtx,pload){
      let { gid,bid } = pload
      bid = BID;
      await delItem( bid, gid);
      commit(DEL_ITEM,gid);
      commit(COUNT_SELECTNUM);
      commit(COUNT_TOTALPRICE);
    },
    async [CAT_CURRENT]({commit}:ICtx,id){
      commit(CAT_CURRENT,id);
    },
    async [LOGIN]({commit}:ICtx,pload){
      let { un,psw } = pload;
      let log = await mallLogin(un, psw);
      // 如果登陆成功
      if(log.code){
        setToken({
          token:log.token,
          un:log.data[0].buyer_name,
          uid:log.data[0].b_id});
        commit(SET_LOGIN_STATUS,true);
      }
      return log.code
    },
    async [LOG_OUT]({commit}:ICtx){
      delToken();
      commit(SET_LOGIN_STATUS,false);
    },

}