<template>
  <div id="home">
    <navbar>
      <template v-slot:center>
        <span class="navbar-span">购物街</span>
      </template>
      <template #right>
        <span class="navbar-right" @click="logOrMe">{{checkinStatus}}</span>
      </template>
    </navbar>
    <sortbar
      :sortTitle="sortbarData"
      @changetype="switchgoodscon"
      ref="sortbar1"
      v-show="is_fixed"
      class="no_01"
    ></sortbar>
    <div
      v-if="flag"
      style="{height: inherit;}"
    >
      <myscroll
        class="scroll"
        ref="scroll"
        @scrollmove="scrollmove"
        @pullupload="loadmore"
        :probtype="3"
      >
        <div class="carsou">
          <vswiper :images="cardata"></vswiper>
        </div>
        <recommend :recomlist="recomlist"></recommend>
        <thweek :thisweek="thweek"></thweek>
        <sortbar
          :sortTitle="sortbarData"
          @changetype="switchgoodscon"
          ref="sortbar2"
          v-show="!is_fixed"
        ></sortbar>
        
        <goodscon
          :goods_data="goods_pop.data"
          v-if="goods_con_type === 0"
        ></goodscon>
        <goodscon
          :goods_data="goods_new.data"
          v-if="goods_con_type === 1"
        ></goodscon>
        <goodscon
          :goods_data="goods_sell.data"
          v-if="goods_con_type === 2"
        ></goodscon>
      </myscroll>
      <backtop
        class="backT"
        @click.native="backtopclick"
        v-if="bt_show"
      ></backtop>
    </div>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  reactive,
  ref,
  toRefs,
} from "vue";
import { IhomeReactive, Iscroll } from "@/typings";
import { gethomeMulti } from "@/network/homeNet";
import { getgoodsList } from "@/network/goodsList";
import sortbarData from "@/data/sortbar";
import recommend from "@/components/recommend/Recommend.vue";
import thweek from "@/components/thisweek/Thisweek.vue";
import sortbar from "@/components/sort-bar/SortBar.vue";
import Comments from "@/libs/goods_detail/comments.vue";
import vswiper from '@/libs/vantswiper/v-swiper.vue';
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { CHANGE_GOODSCON_POSITION, CLEAR_GOODSCON_POSITION } from "@/store/actionTypes";
export default defineComponent({
  name: "homePage",
  components: {
    recommend,
    thweek,
    sortbar,
    Comments,
    vswiper,
  },
  setup() {
    const instance = getCurrentInstance();
    const sortbar1 = ref(null);
    const sortbar2 = ref(null);
    const store = useStore();
    const router = useRouter();
    const state = reactive<IhomeReactive>({
      cardata: [],//swiper数据
      recomlist: [],//推荐数据
      flag: false,
      thweek: null,
      goods_pop: { index: 1, data: null },
      goods_new: { index: 1, data: null },
      goods_sell: { index: 1, data: null },
      goods_con_type: 0,
      bt_show: false,
      sb_offsettop:0,
      is_fixed:false,
      stay_position:0,//记录滚动的高度
      checkinStatus:'未登录'
    });
    let me = `Hi~${localStorage.getItem('userName')}`;
    state.checkinStatus = store.state.is_login?me:'未登录';
    onBeforeMount(async () => {
      try {
        //请求 轮播图，推荐，本周  数据
        let _data = await gethomeMulti();
        let dd =_data.data.data;
        dd.banner.list.forEach(item=>{
          state.cardata.push(item.image);
        });
        state.recomlist = dd.recommend.list;
        state.thweek = dd.thisWeek;
        //请求商品列表数据
        let goods_pop = await getgoodsList({
            pageSize: 8,
            pageIndex:1,
            sortType:'',
            hotPoint:'流行',
          });
        let popD = goods_pop.data.data;
        state.goods_pop.data = popD;
        state.goods_pop.index++;
        let goods_new = await getgoodsList({
            pageSize: 8,
            pageIndex:1,
            sortType:'',
            hotPoint:'新款',
          });
        state.goods_new.data = goods_new.data.data;
        state.goods_new.index++;

        let goods_sell = await getgoodsList({
            pageSize: 8,
            pageIndex:1,
            sortType:'',
            hotPoint:'精选',
          });
        state.goods_sell.data = goods_sell.data.data;
        state.goods_sell.index++;
        state.flag = true;
        
      } catch (error) {
        console.log("请求数据出错" + error);
      }
    });

    const switchgoodscon = (index:number) => {
      //切换后滚动到 记录的位置
      let a = 0;
      //判断 当前con是否滚动过
      a = store.state.goods_con_position[index]==0?state.stay_position
      :store.state.goods_con_position[index];
      //如果当前位置高了  就加载
      if(a>store.state.goods_con_position[state.goods_con_type]){
        loadmore()
      }
      (instance.refs.scroll as Iscroll)
        .scrollPosition(0,a, 0);
      state.goods_con_type = index;
      //让两个sortbar 显示一致
      sortbar1.value.currentIndex = index;
      sortbar2.value.currentIndex = index;
      (instance.refs.scroll as Iscroll).finishpullup();
      (instance.refs.scroll as Iscroll).pull_refresh();
    };
    const backtopclick = () => {
      (instance.refs.scroll as Iscroll).scrollPosition(0, 0, 500);
      //回到顶部后，记录的位置清零
      store.commit(CLEAR_GOODSCON_POSITION);
    };
    const scrollmove = (p) => {      
      if (p.y < -500) {
        state.bt_show = true;
      } else {
        state.bt_show = false;
      }
      if((-p.y + 43)<state.sb_offsettop){
        state.is_fixed = false
      }else{
        state.stay_position = p.y;
        //记录每个goods con 的滚动位
        store.commit(CHANGE_GOODSCON_POSITION,{index:state.goods_con_type,p:p.y - 43})
        state.is_fixed = true
      }
    };

    const loadmore = async () => {
      let hotpoint = '';
      let goods = null
      let index = 0;
      switch(state.goods_con_type){
        case 0:
          index = state.goods_pop.index;
          goods = (await getgoodsList({
            pageSize: 8,
            pageIndex:index,
            sortType:'',
            hotPoint:'流行',
          })).data.data;
          goods.forEach(item=>{
            state.goods_pop.data.push(item);
          })
          state.goods_pop.index ++;
          (instance.refs.scroll as Iscroll).finishpullup();
          (instance.refs.scroll as Iscroll).pull_refresh();
          break;
        case 1:
          index = state.goods_new.index;
          goods = (await getgoodsList({
            pageSize: 8,
            pageIndex:index,
            sortType:'',
            hotPoint:'新款',
          })).data.data;
          goods.forEach(item=>{
            state.goods_new.data.push(item);
          })
          state.goods_new.index ++;
          (instance.refs.scroll as Iscroll).finishpullup();
          (instance.refs.scroll as Iscroll).pull_refresh();
          break;
        case 2:
          index = state.goods_sell.index;
          goods = (await getgoodsList({
            pageSize: 8,
            pageIndex:index,
            sortType:'',
            hotPoint:'精选',
          })).data.data;
          goods.forEach(item=>{
            state.goods_sell.data.push(item);
          })
          state.goods_sell.index ++;
          (instance.refs.scroll as Iscroll).finishpullup();
          (instance.refs.scroll as Iscroll).pull_refresh();
          break;
        default:
          break;
      }
    }
    const car_img_load = ()=>{
      //轮播图加载完第一张图的时候 计算 sortbar的offsetTop
      state.sb_offsettop = sortbar2.value.$el.offsetTop;
    }
    const logOrMe = ()=>{
      if(store.state.is_login){
        router.push('/me');
      }else{
        router.push('/login');
      } 
    }
    return {
      ...toRefs(state),
      sortbarData,
      switchgoodscon,
      backtopclick,
      scrollmove,
      loadmore,
      sortbar2,
      sortbar1,
      car_img_load,
      logOrMe
    };
  },
});
</script>

<style lang='scss' scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  .navbar-span{
    color:#fff;
  }
  .navbar-right{
    color:#fff;
  }
  .no_01{
    position: relative;
    z-index: 10;
  }
  .scroll {
    height: calc(100vh - 93px);
    overflow: hidden;
/*     .carsou {
      max-width: 650px;
      height: 150px;
      margin: 0 auto;
    } */
  }
  .backT {
    position: fixed;
    bottom: 53px;
    right: 5px;
  }
}
</style>