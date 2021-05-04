<template>
    <div id="gdetails" class="wrapper">
      <detailnavbar></detailnavbar>
      <div v-if="falg" >
        <myscroll
          class="content"
          :probtype="3"
          ref="scroll"
          @scrollmove="detailScrollMove"
        >
          <div class="swiper">
            <my-carsousel
              :autoplay="true"
              :duration="3000"
              :hasDot="true"
              :hasDirector="false"
              dotBgColor="#ff5777"
              :cardata="swiper"
            ></my-carsousel>
          </div>
          <detailbrief :briefdata="brief" ></detailbrief>
          <shopbrief :sid="sid" @gotoShop="gotoShop"></shopbrief>
          <goodsparams :parms="parmlist" ></goodsparams>
          <buyercomments :gid="gid" ref="comments"></buyercomments>
          <goodsrecom ref="recommend"></goodsrecom>
          <div class="fix-p"></div>
        </myscroll>
      </div>
      <bottomtool class="bottomtool" @addToCart="addToCart"></bottomtool>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  onBeforeMount,
  reactive,
  toRefs,
  getCurrentInstance,
  nextTick,
  onUpdated,
  watch,
  ref
} from "vue";
import { Store, useStore} from 'vuex'
import { useRoute, useRouter} from "vue-router";
import { getDetails } from "@/network/goodsDetails";
import detailnavbar from "./detailnavbar.vue";
import goodsrecom from './goodsRecomend.vue';
import Toast from '@/libs/toast';
import { SET_CARDATA } from "@/store/actionTypes";
export default defineComponent({
  name: "malldetails",
  components: {
    detailnavbar,
    goodsrecom
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const instance = getCurrentInstance();
    const scroll = ref(null);
    const store:Store<any> = useStore();
    const state = reactive({
      sr: null,
      swiper: [],
      brief: [],
      sid: null,
      gid: null,
      parmlist: [], //color,sizi,params,describe,desimgs
      falg: false,
      cindex:0,
      product:{},
    });
    //监听页面滚动，记录滚动位置
    const detailScrollMove = (p)=>{
      let yy = -p.y;
      //组件中修改 currentIndex的方法
      let changein = instance.subTree.children[0].component.ctx.changeindex;
      //滚动到 区域产生唯一一个 i 
      let i = 0;
      if(yy>=0 && yy<store.state.detail_heights.parms.vh){
        i = 0 ;
      }else if(yy>=store.state.detail_heights.parms.vh && yy<store.state.detail_heights.comments.vh){
        i = 1;
      }else if(yy>=store.state.detail_heights.comments.vh && yy < store.state.detail_heights.recom.vh){
        i = 2;
      }else{
        i = 3;
      }
      changein(i);
      // console.log(store.state.detail_heights)
    }
    //监听路由改变
    watch(()=>{
      return route.params.id
    },async (val)=>{
      try {
        let dd = await getDetails(route.params.id as string);
        let d = dd.data[0];
        let topimgs = d.top_imgs.split(",");
        let gname = d.g_name;
        //brief[gname,price,marketprice,likes,grand_total]
        state.brief.push(
          d.g_name,
          d.price,
          d.marketprice,
          d.likes,
          d.grand_total
        );
        //形成swiper数据格式
        state.sid = d.shop_id;
        state.gid = d.iid;
        for (let i = 0; i < topimgs.length; i++) {
          state.swiper.push({
            link: "",
            title: gname,
            image: topimgs[i],
          });
        }
        //params参数
        state.parmlist[0] = d.colors;
        state.parmlist[1] = d.sizes;
        state.parmlist[2] = d.params.split(",");
        state.parmlist[3] = d.describe_text;
        state.parmlist[4] = d.describe_imgs.split(",");
        state.falg = true;
        //购物车参数
        state.product = {
          gid:state.gid,
          faceimg:state.swiper[0].image,
          gname:state.brief[0],
          price:state.brief[1],
          num:1,
          checked:1,
          bid:''
        }
      } catch (err) {
        console.log("details请求有问题：" + err);
      }
      console.log(val);
      window.location.reload();
      scroll.value?.scrollPosition(0,0,100);
    })
    //加入购物车
    const addToCart = ()=>{
      //购物车需要展示的数据  图片 名称 价格 数量
      Toast({
        message:'加入购物车成功~',
        delay:1000
      })
      //给action 派发事件 调取localStorage//数据库请求
      store.dispatch(SET_CARDATA,state.product);
    }
    onBeforeMount(async () => {
      try {
        let dd = (await getDetails(route.params.id as string)).data;
        let d = dd.data[0];
        let topimgs = d.top_imgs.split(",");
        let gname = d.g_name;
        //brief[gname,price,marketprice,likes,grand_total]
        state.brief.push(
          d.g_name,
          d.price,
          d.marketprice,
          d.likes,
          d.grand_total
        );
        //形成swiper数据格式
        state.sid = d.shop_id;
        state.gid = d.iid;
        for (let i = 0; i < topimgs.length; i++) {
          state.swiper.push({
            link: "",
            title: gname,
            image: topimgs[i],
          });
        }
        //params参数
        state.parmlist[0] = d.colors;
        state.parmlist[1] = d.sizes;
        state.parmlist[2] = d.params.split(",");
        state.parmlist[3] = d.describe_text;
        state.parmlist[4] = d.describe_imgs.split(",");
        state.falg = true;
        //购物车参数
        state.product = {
          gid:state.gid,
          faceimg:state.swiper[0].image,
          gname:state.brief[0],
          price:state.brief[1],
          num:1,
          checked:1,
          bid:''
        }
      } catch (err) {
        console.log("details请求有问题：" + err);
      }
    });
    const gotoShop = ()=>{
      router.push('/shop')
    }
    return {
      ...toRefs(state),
      detailScrollMove,
      addToCart,
      scroll,
      gotoShop
    };
  },
});
</script>

<style lang='scss' scoped>
#gdetails {
  position: relative;
  background-color: var(--color-background-light);
  z-index: 12;

  .swiper {
    width: 100%;
    height: 22rem;
    margin-top: 44px;
  }
  .fix-p{
    width: 100%;
    height: 49px;
  }
  .bottomtool{
    position: fixed;
    bottom: 0;
  }
}
</style>