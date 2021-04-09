<template>
  <div class="ctotal">
    <div class="selectbox">
      <div class="box">
        <cartcheck
          @checkclick="checkClick"
          :itemchecked="totalcheck"
        ></cartcheck>
      </div>
      <span>全选</span>
    </div>
    <div class="sum"><span>总计：￥{{}}</span></div>
    <div class="paybill">去结算</div>
  </div>
</template>

<script lang='ts'>
import { useStore } from "vuex";
import { defineComponent, onBeforeMount, reactive, toRefs } from "vue";
import cartcheck from "./cart-check.vue";
import { ALL_CHECKED } from "@/store/actionTypes";
export default defineComponent({
  name: "carttotal",
  components: {
    cartcheck,
  },
  setup(){
    const store = useStore();
    const state = reactive({
      totalcheck:0
    })
    const checkClick = (ck)=>{
      store.dispatch(ALL_CHECKED,ck)
    }
    onBeforeMount(()=>{
      let len = store.state.cartData.length;
      let i = 0;
      store.state.cartData.forEach(prod=>{
        if(prod.checked == 1){
          i++;
        }
      })
      if(len == i && i !==0){
        state.totalcheck = 1;
      }
    })
    return {
      ...toRefs(state),
      checkClick
    }
  }
});
</script>

<style lang='scss' scoped>
.ctotal {
  width: 100%;
  background: #d7f8f8;
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 18px;
  .selectbox{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    width: 26%;
    .box{
      width: 20px;
    }
    span{
      display: inline-block;

    }
  }
  .sum{
    min-width: 150px;
    span{
      line-height: 44px;
      text-align: left;
      font-weight: bold;
    }
  }
  .paybill{
    width: 100px;
    background: tomato;
    color: #fff;
    line-height: 44px;
    text-align: center;
  }
}
</style>