<template>
  <div class="grecom" ref="grecom">
    <span class="recomhead">相关推荐</span>
    <goodscon :goods_data="gdata" @carImgload="carImgload"></goodscon>
    <span class="recomfooter">- 到底了 -</span>
  </div>
</template>

<script lang='ts'>
import { nextTick, onBeforeMount, onMounted, onUpdated, reactive, ref, toRefs} from "vue";
import { getrecomList } from "@/network/goodsList";
import { useStore } from 'vuex';
import { VH_RECOM } from '@/store/actionTypes';
export default{
  name: "goodsrecom",
  setup(p,ctx) {
    // iid g_name price marketprice inventory top_imgs
    const grecom = ref(null);
    const store = useStore();
    const state = reactive({
      gdata: [],
    });
    let count = 0;
    const carImgload = ()=>{
      count++;
      if(count>10){
        count = 0;
        ctx.emit('carImgload');
        console.log(grecom.value.offsetTop)
        store.commit(VH_RECOM,grecom.value.offsetTop);
      }
    }
    onMounted(async () => {
      try{
        let dd = await getrecomList();
        dd.data.forEach(item =>{
          state.gdata.push(item);
        })
      }catch(err){
        console.log('recomlist请求出错：'+err)
      }
    });
    return {
      ...toRefs(state),
      carImgload,
      grecom
    }
  },
};
</script>

<style lang='scss' scoped>
@mixin x{
  display: inline-block;
  width: 100%;
  height: 33px;
  text-align: center;
  line-height: 33px;
  font-size: 16px;
}
.grecom {
  width: 100%;
  border: 10px solid var(--color-background-light);
  border-radius: 20px;
  padding: 5px;
  background: var(--color-background);
  border-bottom: 5px;
  .recomhead{
    @include x;
    text-shadow: 1px 1px 1px #aaaccc
  }
  .recomfooter{
    @include x;
    color:#8b8b8b;
  }
}
</style>