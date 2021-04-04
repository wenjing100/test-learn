<template>
  <div class="grecom" ref="grecom">
    <span class="recomhead">相关推荐</span>
    <goodscon :goods_data="gdata" @carImgload="carImgload"></goodscon>
    <span class="recomfooter">- 到底了 -</span>
  </div>
</template>

<script lang='ts'>
import { getCurrentInstance, nextTick, onBeforeMount, onUpdated, reactive, ref, toRefs, watch } from "vue";
import { getrecomList } from "@/network/goodsList";
import { Iscroll } from '@/typings';
export default{
  name: "goodsrecom",
  setup(p,ctx) {
    // iid g_name price marketprice inventory top_imgs
    const grecom = ref(null);
    const state = reactive({
      gdata: [],
      vH:0
    });
    const carImgload = ()=>{
      ctx.emit('carImgload')
      state.vH = grecom.value.offsetTop;
    }
    onUpdated(async ()=>{
      await nextTick();
  
    })
    const instance = getCurrentInstance();
    onBeforeMount(async () => {
      try{
        let dd = await getrecomList();
        state.gdata = dd.data;
        // (instance.parent as any).ctx.pull_refresh()
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