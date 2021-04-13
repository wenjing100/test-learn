<template>
    <div id="gdetails" class="wrapper">
      <detailnavbar :dpy="dpy"></detailnavbar>
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
              @car_img_load="parmalready"
            ></my-carsousel>
          </div>
          <detailbrief :briefdata="brief" ></detailbrief>
          <shopbrief :sid="sid"></shopbrief>
          <goodsparams :parms="parmlist" ref="parm" @parmalready="parmalready"></goodsparams>
          <buyercomments :gid="gid" ref="comm"></buyercomments>
          <goodsrecom ref="recom" @carImgload="parmalready"></goodsrecom>
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
  onMounted,
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
    const scroll = ref(null)
    const store:Store<any> = useStore();
    const state = reactive({
      sr: null,
      swiper: [],
      brief: [],
      sid: null,
      gid: null,
      parmlist: [], //color,sizi,params,describe,desimgs
      falg: false,
      dpy:[],//记录组件位置
      cindex:0,
      product:{},
    });
    //监听组件加载情况 更新组件高度
    const parmalready = ()=>{
      state.dpy[0] = 0;
      state.dpy[2] = (instance.refs.comm as any).vH;
      state.dpy[1] = (instance.refs.parm as any).vH;
      state.dpy[3] = (instance.refs.recom as any).vH;
    }
    //监听页面滚动，记录滚动位置
    const detailScrollMove = (p)=>{
      let yy = -p.y;
      let len = state.dpy.length;
      //组件中修改 currentIndex的方法
      let changein = instance.subTree.children[0].component.ctx.changeindex;
      //滚动到 区域产生唯一一个 i 
      for(let i = 0; i < len; i++){
        if(state.cindex !== i && (
          (i<len-1 && yy >= state.dpy[i] && yy<state.dpy[i+1])||
          (i===len - 1 && yy >= state.dpy[i])
          )){
          state.cindex = i;
          changein(i);
        }
      } 
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
    const addToCart = ()=>{
      //购物车需要展示的数据  图片 名称 价格 数量
      Toast({
        message:'加入购物车成功~',
        delay:1000
      })
      //给action 派发事件 调取localStorage//数据库请求
      store.dispatch(SET_CARDATA,state.product);
    }
    onUpdated(async()=>{
      await nextTick();
    })
    onBeforeMount(async () => {
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
    });

    return {
      ...toRefs(state),
      parmalready,
      detailScrollMove,
      addToCart,
      scroll
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