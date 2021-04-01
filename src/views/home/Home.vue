<template>
  <div id="home">
    <navbar>
      <template v-slot:center>
        <span class="navbar-span">购物街</span>
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
          <my-carsousel
            :autoplay="true"
            :duration="3000"
            :hasDot="true"
            :hasDirector="false"
            dotBgColor="#ff5777"
            :cardata="cardata"
            @car_img_load="car_img_load"
          ></my-carsousel>
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
          @imgload="imgload"
        ></goodscon>
        <goodscon
          :goods_data="goods_new.data"
          v-if="goods_con_type === 1"
          @imgload="imgload"
        ></goodscon>
        <goodscon
          :goods_data="goods_sell.data"
          v-if="goods_con_type === 2"
          @imgload="imgload"
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
  computed,
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
import { debounce } from '@/hooks/fangdou'
export default defineComponent({
  name: "homePage",
  components: {
    recommend,
    thweek,
    sortbar,
  },
  setup() {
    const instance = getCurrentInstance();
    const sortbar1 = ref(null);
    const sortbar2 = ref(null);
    const state = reactive<IhomeReactive>({
      cardata: null,
      recomlist: null,
      flag: false,
      thweek: null,
      goods_pop: { index: 1, data: null },
      goods_new: { index: 1, data: null },
      goods_sell: { index: 1, data: null },
      goods_con_type: 0,
      bt_show: false,
      sb_offsettop:0,
      is_fixed:false
    });
    onBeforeMount(async () => {
      try {
        //请求 轮播图，推荐，本周  数据
        let _data = await gethomeMulti();
        state.cardata = _data.data.banner.list;
        state.cardata.map(item=>{
          let a = 'http://47.110.38.241/';
          item.image = a + item.image;
        })
        console.log(state.cardata)
        state.recomlist = _data.data.recommend.list;
        state.thweek = _data.data.thisWeek;
        //请求商品列表数据
        let goods_pop = await getgoodsList(
          8,
          state.goods_pop.index,
          "asc",
          "流行"
        );
        state.goods_pop.data = goods_pop.data;
        state.goods_pop.index++;
        let goods_new = await getgoodsList(
          8,
          state.goods_new.index,
          "asc",
          "新款"
        );
        state.goods_new.data = goods_new.data;
        state.goods_new.index++;

        let goods_sell = await getgoodsList(
          8,
          state.goods_sell.index,
          "asc",
          "精选"
        );
        state.goods_sell.data = goods_sell.data;
        state.goods_sell.index++;
        state.flag = true;
        
      } catch (error) {
        console.log("请求数据出错" + error);
      }
    });
    // onMounted(()=>{
    //   let aa = (instance.refs.scroll as Iscroll);
    //   let refresh = debounce(aa.pull_refresh,500);
    // })
    const switchgoodscon = (index:number) => {
      state.goods_con_type = index;
      //让两个sortbar 显示一致
      sortbar1.value.currentIndex = index;
      sortbar2.value.currentIndex = index;
      (instance.refs.scroll as Iscroll).finishpullup();
      (instance.refs.scroll as Iscroll).pull_refresh();
    };
    const backtopclick = () => {
      (instance.refs.scroll as Iscroll).scrollPosition(0, 0, 500);
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
        state.is_fixed = true
      }
    };
    const imgload = ()=>{
      (instance.refs.scroll as Iscroll).pull_refresh();
    }
    const loadmore = async () => {
      let hotpoint = '';
      let goods = null
      let index = 0;
      switch(state.goods_con_type){
        case 0:
          hotpoint = '流行';
          index = state.goods_pop.index;
          goods = (await getgoodsList(8,index,'asc',hotpoint)).data;
          goods.forEach(item=>{
            state.goods_pop.data.push(item);
          })
          state.goods_pop.index ++;
          (instance.refs.scroll as Iscroll).finishpullup();
          (instance.refs.scroll as Iscroll).pull_refresh();
          break;
        case 1:
          hotpoint = '新款';
          index = state.goods_new.index;
          goods = (await getgoodsList(8,index,'asc',hotpoint)).data;
          goods.forEach(item=>{
            state.goods_new.data.push(item);
          })
          state.goods_new.index ++;
          (instance.refs.scroll as Iscroll).finishpullup();
          (instance.refs.scroll as Iscroll).pull_refresh();
          break;
        case 2:
          hotpoint = '精选';
          index = state.goods_sell.index;
          goods = (await getgoodsList(8,index,'asc',hotpoint)).data;
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
    return {
      ...toRefs(state),
      sortbarData,
      switchgoodscon,
      backtopclick,
      scrollmove,
      loadmore,
      imgload,
      sortbar2,
      sortbar1,
      car_img_load
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
  .no_01{
    position: relative;
    z-index: 10;
    
  }
  .scroll {
    height: calc(100vh - 93px);
    overflow: hidden;
    .carsou {
      max-width: 650px;
      height: 150px;
      margin: 0 auto;
    }
  }
  .backT {
    position: fixed;
    bottom: 53px;
    right: 5px;
  }
}
</style>