<template>
  <div id="cart" :class="{void:isEmpty}">
    <navbar>
      <template v-slot:center>
        <span class="nav-span"> 购物车({{ count }}) </span>
      </template>
    </navbar>
    <myscroll
      :probtype="3"
    >
      <div class="cartCon">
        <div v-if="isEmpty" class="empty">您的购物车为空哦~</div>
        <div v-else class="cartbody" v-for="(item,index) in goodList" :key="item.gid">
          <cartitem :itemdata="item"></cartitem>
        </div>
        <div class="p"></div>
      </div>
    </myscroll>
    <carttotal class="cartotal" ></carttotal>
  </div>
</template>

<script lang='ts'>
import { useStore } from "vuex";
import cartitem from './cart-item.vue'
import { defineComponent, onBeforeMount, reactive, ref, toRefs } from "vue";
import carttotal from './cart-total.vue'
export default defineComponent({
  name: "cartPage",
  components:{
    cartitem,
    carttotal
  },
  setup() {
    const store = useStore();
    const BID = 'vght1c';//模拟用户
    const state = reactive({
      count: 0,
      goodList: [],
      isEmpty: true,
    });
    onBeforeMount(async () => {
      if (store.state.cartData.length) {
        state.isEmpty = false;
        state.goodList = store.state.cartData;
        state.count = store.state.cartData.length;
      } else {
        state.isEmpty = true;
      }
      state.count = state.goodList.length;
    });
  
    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang='scss' scoped>

#cart {
  padding-top: 44px;
  width: 100%;
  background: var(--color-background-light);
  .cartotal{
    position: absolute;
    bottom: 44px;
  }
  .nav-span {
    color: #fff;
  }
  .cartCon {
    width: 100%;
    .p{
      /*height: 103px;*/
      width: 100%;
    }
    .empty{
      width: 100%;
      height: 150px;
      padding: 50px 0;
      font-size: 25px;
      text-align: center;
    }
  }
}
.void{
  background: #fff;
}
</style>