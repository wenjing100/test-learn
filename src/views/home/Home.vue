<template>
  <div id="home">
    <navbar>
      <template v-slot:center>
        <span>购物街</span>
      </template>
    </navbar>
    <div v-if="flag" style="{height:inherit}">
      <myscroll class="scroll" ref="scroll" @scrollmove="scrollmove" :probtype="3">
        <div class="carsou">
          <my-carsousel
            :autoplay="true"
            :duration="3000"
            :hasDot="true"
            :hasDirector="true"
            dotBgColor="#ff5777"
            :cardata="cardata"
          ></my-carsousel>
        </div>
        <recommend :recomlist="recomlist"></recommend>
        <thweek :thisweek="thweek"></thweek>
        <sortbar
          :sortTitle="sortbarData"
          @changetype="switchgoodscon"
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
      <backtop class="backT" @click.native="backtopclick" v-if="bt_show"></backtop>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, getCurrentInstance, onBeforeMount, reactive, ref, toRefs } from "vue";
import { IhomeReactive, Iscroll } from "@/typings";
import { gethomeMulti } from "@/network/homeNet";
import { getgoodsList } from "@/network/goodsList";
import sortbarData from "@/data/sortbar";
import recommend from "@/components/recommend/Recommend.vue";
import thweek from "@/components/thisweek/Thisweek.vue";
import sortbar from "@/components/sort-bar/SortBar.vue";

export default defineComponent({
  name: "homePage",
  components: {
    recommend,
    thweek,
    sortbar,
  },
  setup() {
    const instance = getCurrentInstance()
    const state = reactive<IhomeReactive>({
      cardata: null,
      recomlist: null,
      flag: false,
      thweek: null,
      goods_pop: { index: 1, data: null },
      goods_new: { index: 1, data: null },
      goods_sell: { index: 1, data: null },
      goods_con_type: 0,
      bt_show:false
    });
    onBeforeMount(async () => {
      try {
        let _data = await gethomeMulti();
        state.cardata = _data.data.banner.list;
        state.recomlist = _data.data.recommend.list;
        state.thweek = _data.data.thisWeek;

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
    const switchgoodscon = (index) => {
      state.goods_con_type = index;
    };
    const backtopclick = ()=>{
      (instance.refs.scroll as Iscroll).scrollPosition(0,0,500);
    }
    const scrollmove = (p)=>{
      if(p.y<-500){
        state.bt_show = true;
      }else{
        state.bt_show = false;
      }
    }
    return {
      ...toRefs(state),
      sortbarData,
      switchgoodscon,
      backtopclick,
      scrollmove
    };
  },
});

</script>

<style lang='scss' scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  .scroll {
    height:calc(100vh - 93px);
    overflow: hidden;
    .carsou {
      max-width: 650px;
      height: 150px;
      margin: 0 auto;
    }
  }
  .backT{
    position: fixed;
    bottom: 53px;
    right: 5px;
  }
}
</style>