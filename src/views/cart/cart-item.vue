<template>
  <sliddel @slidDelClick="slidDelClick">
    <div class="cartitem">
      <div class="left">
        <cartcheck
          @checkclick="checkClick"
          :itemchecked="itemdata.checked"
          ref="itemcheck"
        ></cartcheck>
      </div>
      <div class="itemimg"><img :src="itemdata.faceimg" alt="" /></div>
      <div class="info">
        <span class="gn"><span>{{ itemdata.gname }}</span></span>
        <div class="p-num">
          <span class="p">￥{{ itemdata.price }}</span>
          <div class="num">
            <button @click="add(itemdata.gid)">+</button>
            <span>{{ itemdata.num }}</span>
            <button @click="sub(itemdata.gid)" :disabled="isDisable">-</button>
          </div>
        </div>
      </div>
    </div>
  </sliddel> 
</template>
	
<script lang='ts'>
import { SET_NUM_SUB, SET_NUM_ADD, SET_CARDATA_CHECK, DEL_ITEM } from "@/store/actionTypes";
import { useStore } from "vuex";
import { defineComponent, PropType, reactive, ref, toRefs, watch } from "vue";
import cartcheck from './cart-check.vue'
import { IviewCartItem } from "@/typings";
export default defineComponent({
  name: "cartitem",
  components:{
    cartcheck
  },
  props: {
    itemdata: {
      type: Object as PropType<IviewCartItem>,
    },
  },
  setup(props,{ emit }) {
    const store = useStore();
    const itemcheck = ref(null);
    const state = reactive({
      isDisable: props.itemdata.num>1?false:true,
      mycheck:props.itemdata.checked,
      lognum:props.itemdata.num,
    });
    //监听全选
    watch(()=>{
      return store.state.isAllchecked
    },(val)=>{
      if(val == 1){
        itemcheck.value.checked = val;
      }
    })
    //监听全不选
    watch(()=>{
      return store.state.disChecked
    },(val)=>{
      if(val == 1){
        itemcheck.value.checked = 0;
      }
    })
    const add = (gid) => {
      store.dispatch(SET_NUM_ADD,{gid,num:1});
      state.lognum++;
			state.isDisable = false;
    };
    const sub = (gid) => {
      store.dispatch(SET_NUM_SUB,{gid,num:1});
      state.lognum--;
      if (state.lognum < 2 ){
        state.isDisable = true;
      } 
    };
    const checkClick = (ck:number)=>{
      state.mycheck = ck;
      store.dispatch(SET_CARDATA_CHECK,{gid:props.itemdata.gid,status:ck})
    }
    const slidDelClick = ()=>{
      store.dispatch(DEL_ITEM,{gid:props.itemdata.gid,bid:''});
    }
    return {
      ...toRefs(state),
      add,
      sub,
      checkClick,
      itemcheck,
      slidDelClick,
    };
  },
});
</script>

<style lang='scss' scoped>
.cartitem {
  width: 100%;
  border-top: 5px solid var(--color-background-light);
  background: var(--color-background);
  padding: 5px;
	display: flex;
	flex-direction: row;
	align-items: center;
  font-size: 16px;
	.left{
    width: 44px;
  }
	.itemimg{
		img{
			width: 60px;
			height: 80px;
			border-radius: 5px;
		}
	}
	.info{
		display: flex;
		flex-direction: column;
    justify-content: space-between;
		.gn{
      overflow: hidden;
      height: 40px;
      width: 100%;
      padding-left: 5px;
      span{
        width: 100%;
        padding: 5px;
			  color: #000;
        line-height: 20px;
        text-overflow:ellipsis;
      }
		}
		.p-num{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding: 10px 5px;
      margin-left: 3px;
      width: 100%;
			.num{
				button{
          border: none;
          box-shadow: -1px 1px 5px 1px rgba(35, 56, 63, 0.37);
          width: 24px;
          height: 24px;
					text-align: center;
          margin: 0 6px;
          border-radius: 50%;
          outline: none;
          &:active{
            box-shadow: -1px 1px 5px -1px rgba(0,0,0,.3);
          }
				}
        span{
          min-width: 20px;
          display: inline-block;
          text-align: center;
        }
			}
        
		}
	}
}
</style>