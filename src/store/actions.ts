import { ALL_CHECKED, CAT_CURRENT, COUNT_SELECTNUM, COUNT_TOTALPRICE, DEL_ITEM, GET_CARDATA, LOGIN, SET_CARDATA, SET_CARDATA_CHECK, SET_NUM_ADD, SET_NUM_SUB } from './actionTypes';
import { Commit,} from 'vuex';
import { Istate,  } from '../typings';
import { getCartList, CartList_add, CartList_sub, setCheck, AddTocart, allCheck, delItem } from '@/network/cartNet';
import { fetchCat } from '@/network/catagoryNet';
import { mallLogin } from '@/network/login';
import { setToken } from '@/hooks/checkLogin';
import { useRoute, useRouter } from 'vue-router';

interface ICtx {
    commit: Commit,
    state : Istate
}
// 模拟使用的用户b_id vght1c 
const BID = 'vght1c';
const route = useRoute();
const router = useRouter();
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
      commit(COUNT_SELECTNUM);
      commit(COUNT_TOTALPRICE);
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
    async [CAT_CURRENT]({commit}:ICtx,pload){
      let { id,size } = pload;
      commit(CAT_CURRENT,id);
      await fetchCat( id, size);
    },
    async [LOGIN]({commit}:ICtx,pload){
      let { un,psw } = pload;
      
      let log = await mallLogin(un, psw);
      // @ts-ignore 如果登陆成功
      if(log.code){
        // @ts-ignore
        setToken(log.token);
        commit(LOGIN,{un,islogin:true});
      }
      // @ts-ignore
      return log.code
    },

}