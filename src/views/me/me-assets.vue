<template>
  <div class="asset">
    <div class="left">
      <span><i class="number">{{money.toFixed(2)}}</i>元</span>
      <span>我的余额</span>
    </div>
    <div class="center">
      <span><i class="number">{{youhui}}</i>个</span>
      <span>我的优惠</span>
    </div>
    <div class="right">
      <span><i class="number">{{jifen}}</i>分</span>
      <span>我的积分</span>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  name: "measset",
  setup(){
    const state = reactive({
      money:0,
      youhui:0,
      jifen:0
    })
    return{
      ...toRefs(state)
    }
  }
});
</script>

<style lang='scss' scoped>
@mixin item{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.asset {
  width: 100%;
  height: 120px;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  color: var(--color-text);
  border-bottom: 15px solid var(--color-background-light);
  .left,.center,.right{
    @include item;
    border-right: 1px solid #cecece;
    height: 100%;
    i{
      color:tomato;
      font-style: normal;
      padding-right: 3px;
      font-size: 26px;
      font-weight: bold;
    }
  }
  .right{
    border-right: none;
  }
}
</style>