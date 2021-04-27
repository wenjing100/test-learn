<template>
<div>
  <navbar>
    <template #left>
      <span class="s-l" @click="sBack">&lt;</span>
    </template>
    <template #center>
      <span class="s-banner">店铺信息</span>
    </template>
  </navbar>
  <div class="shop">
    <div class="shopbrief">
      <div class="s-">
        <div class="s-img"></div>
        <span class="s-title">店铺名字</span>
      </div>
      <div class="s-describe">
        <i class="order"><span>+ </span>订阅</i>
      </div> 
    </div>
    <div class="rate">
      店铺综合评分
    </div>
  </div>
</div>
</template>

<script lang='ts'>
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
export default defineComponent({
  name: "shoppage",
  props: {
    briefdata: {
      type: Array,
      default: [],
    },
  },
  setup(){
    const router = useRouter()
    const sBack = ()=>{
      router.back();
    }
    return{
      sBack
    }
  }
});
</script>

<style lang='scss' scoped>
@mixin border {
  width: 100%;
  border: 10px solid var(--color-background-light);
  border-radius: 20px;
  padding: 5px;
  background: var(--color-background);
}
.s-l{
  font-size: 26px;
  font-weight: bold;
  color: #fff;
}
.s-banner{
  color: #fff;
}
.shop {
  background: var(--color-background-light);
  max-height: 812px;
  min-height: 720px;
  border-top: 44px solid transparent;
  .shopbrief {
    @include border;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 3px 20px;
    height: 100px;
    .s- {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      .s-img {
        width: 30px;
        height: 30px;
        background: gray;
        border-radius: 50%;
      }
      .s-title {
        padding: 0 5px;
        font-weight: bold;
        font-size: 18px;
        color: purple;
      }
    }
    .order {
      color: red;
    }
  }
  .rate{
    @include border;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 3px 20px;
    height: 100px;
  }
}
</style>