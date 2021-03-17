<template>
  <div class="home">
    <navbar>
      <template v-slot:center>
        <span>购物街</span>
      </template>
    </navbar>
    <div v-if="flag">
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
      <sortbar :sortTitle="sortbarData" @changetype="switchgoodscon"></sortbar>
      <goodscon :goods_data="goods_pop.data" v-if="goods_con_type === 0"></goodscon>
      <goodscon :goods_data="goods_new.data" v-if="goods_con_type === 1"></goodscon>
      <goodscon :goods_data="goods_sell.data" v-if="goods_con_type === 2"></goodscon>
    </div>
    
    <h2>Home</h2>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeMount, reactive, toRefs } from "vue";
import { IhomeReactive } from "@/typings";
import { gethomeMulti } from "@/network/homeNet";
import { getgoodsList } from '@/network/goodsList'
import sortbarData from '@/data/sortbar'
import recommend from '@/components/recommend/Recommend.vue'
import thweek from '@/components/thisweek/Thisweek.vue'
import sortbar from '@/components/sort-bar/SortBar.vue'
export default defineComponent({
  name: "homePage",
  components:{
    recommend,
    thweek,
    sortbar,
  },
  setup() {
    const state = reactive<IhomeReactive>({
      cardata: null,
      recomlist:null,
      flag:false,
      thweek:null,
      goods_pop:{index:1,data:null},
      goods_new:{index:1,data:null},
      goods_sell:{index:1,data:null},
      goods_con_type:0
    });
    onBeforeMount(async () => {
      try {
        let _data = await gethomeMulti();
        state.cardata = _data.data.banner.list;
        state.recomlist = _data.data.recommend.list;
        state.thweek = _data.data.thisWeek;

        let goods_pop = await getgoodsList(8,state.goods_pop.index,'asc','流行');
        state.goods_pop.data = goods_pop.data;
        state.goods_pop.index++;

        let goods_new = await getgoodsList(8,state.goods_new.index,'asc','新款');
        state.goods_new.data = goods_new.data;
        state.goods_new.index++;

        let goods_sell = await getgoodsList(8,state.goods_sell.index,'asc','精选');
        state.goods_sell.data = goods_sell.data;
        state.goods_sell.index++;

        state.flag = true
      } catch (error) {
        console.log("请求数据出错" + error);
      }
    });
    const switchgoodscon = (index)=>{
      state.goods_con_type = index;
    }
    // let cardata = [{link:'',title:'',image:'./src/assets/img/0.jpg'}]
    return {
      ...toRefs(state),
      sortbarData,
      switchgoodscon
    };
  },
});
</script>

<style lang='scss' scoped>
.home{
  padding-top: 44px;
}
.carsou {
  max-width: 650px;
  height: 150px;
  margin: 0 auto;
}
</style>