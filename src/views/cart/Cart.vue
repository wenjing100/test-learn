<template>
  <div id="cart" :class="{ void: isEmpty }">
    <navbar>
      <template v-slot:center>
        <span class="nav-span"> 购物车({{ count }}) </span>
      </template>
    </navbar>
    <myscroll :probtype="3" ref="cartScroll" @pullupload="cartpullup">
      <div class="cartCon">
        <div v-if="isEmpty" class="empty">您的购物车为空哦~</div>
        <div
          v-else
          class="cartbody"
          v-for="(item, index) in goodList"
          :key="item.gid"
        >
          <div class="cartbody-insider">
            <cartitem
              :itemdata="item"
            ></cartitem>
          </div>
        </div>
      </div>
    </myscroll>
    <carttotal class="cartotal"></carttotal>
  </div>
</template>

<script lang='ts'>
import { useStore } from "vuex";
// import cartitem from './cart-item.vue';
let cartitem = defineAsyncComponent(() => import("./cart-item.vue"));
import {
  defineAsyncComponent,
  defineComponent,
  onBeforeMount,
  reactive,
  ref,
  toRefs,
  watch,
} from "vue";
import carttotal from "./cart-total.vue";
import { GET_CARDATA } from "@/store/actionTypes";
export default defineComponent({
  name: "cartPage",
  components: {
    cartitem,
    carttotal,
  },
  setup() {
    const store = useStore();
    const cartScroll = ref(null);
    const state = reactive({
      count: 0,
      goodList: [],
      isEmpty: false,
    });
    onBeforeMount(async () => {
      try {
        let cartOk = await store.dispatch(GET_CARDATA,store.state.userid);
        if(cartOk){
          state.isEmpty = false;
          state.goodList = store.state.cartData;
          state.count = store.state.cartData.length;
          state.count = state.goodList.length;
        }else {
          state.isEmpty = true;
        }
      } catch (error) {
        console.log('购物车请求出错'+error)
      }
    });
    watch(
      () => {
        return store.state.cartData.length;
      },
      (val) => {
        state.count = val;
        let iidd = setTimeout(() => {
          clearTimeout(iidd);
          if (val === 0) {
            state.isEmpty = true;
          }
        }, 500);
      }
    );

    const cartpullup = ()=>{
      cartScroll.value?.pull_refresh(); 
    }
    return {
      ...toRefs(state),
      cartScroll,
      cartpullup
    };
  },
});
</script>

<style lang='scss' scoped>
#cart {
  padding-top: 44px;
  width: 100%;
  height: 100vh;
  .cartotal {
    position: absolute;
    bottom: 44px;
  }
  .nav-span {
    color: #fff;
  }
  .cartCon {
    width: 100%;
    .cartbody{
      max-height: calc(100vh - 93px);
      .cartbody-insider{
        width: 100%;
        height: 110px;
        overflow: hidden;
      }
    }
   
    .empty {
      width: 100%;
      height: 150px;
      padding: 50px 0;
      font-size: 25px;
      text-align: center;
    }
  }
}
.void {
  background: #fff;
}
</style>