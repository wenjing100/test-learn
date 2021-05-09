<template>
  <div class="ctotal">
    <div class="selectbox">
      <div class="box">
        <cartcheck
          @checkclick="checkClick"
          :itemchecked="totalcheck"
          ref="checkallcon"
        ></cartcheck>
      </div>
      <span>全选</span>
    </div>
    <div class="sum"><span>总计：￥{{tprice}}</span></div>
    <div class="paybill">去结算({{snum}})</div>
  </div>
</template>

<script lang='ts'>
import { useStore } from "vuex";
import { defineComponent, onBeforeMount, reactive, toRefs, watch, ref, computed } from "vue";
import cartcheck from "./cart-check.vue";
import { ALL_CHECKED } from "@/store/actionTypes";
export default defineComponent({
  name: "carttotal",
  components: {
    cartcheck,
  },
  setup(){
    const store = useStore();
    const checkallcon = ref(null);
    const state = reactive({
      totalcheck:0,
      tprice:0,
      snum:store.state.selectNum
    })
    //计算属性 计算总价？
    computed(()=>{
      store.state.cartData.forEach(item=>{
        state.tprice += item.price*item.num;
      })
    })
    //全选点击
    const checkClick = (ck)=>{
      store.dispatch(ALL_CHECKED,ck)
    }
    watch(()=>{
      return store.state.isAllchecked
    },(val)=>{
      checkallcon.value.checked = val;
    })
    //监听数量
    watch(()=>{
      return store.state.selectNum
    },(val)=>{
      state.snum = val;
    })
    //监听总价
    watch(()=>{
      return store.state.totalPrice
    },(val)=>{
      state.tprice = val;
    })
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
      checkClick,
      checkallcon
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
    width:80px;
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
    width: 120px;
    background: tomato;
    color: #fff;
    line-height: 44px;
    text-align: center;
    padding: 0 3px;
  }
}
</style>