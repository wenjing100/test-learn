<template>
  <div class="cartitem">
    <cartcheck
      @checkclick="checkClick"
      :itemchecked="itemdata.checked"
    ></cartcheck>
    
    <div class="itemimg"><img :src="itemdata.faceimg" alt="" /></div>
    <div class="info">
      <span class="gn">{{ itemdata.gname }}</span>
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
</template>
	
<script lang='ts'>
import { SET_NUM_SUB, SET_NUM_ADD, SET_CARDATA_CHECK } from "@/store/actionTypes";
import { useStore } from "vuex";
import { defineComponent, PropType, reactive, toRefs } from "vue";
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
  setup(props) {
    const store = useStore();
    const state = reactive({
      isDisable: false,
    });
    const add = (gid) => {
      store.dispatch(SET_NUM_ADD,{gid,num:1});
			state.isDisable = false;
    };
    const sub = (gid) => {
      store.dispatch(SET_NUM_SUB,{gid,num:1});
      let n = 0;
      store.state.cartData.map(item=>{
        if(item.gid == gid){
          n = item.num
        }
        return item
      });
      if (n < 2 ){
        state.isDisable = true;
      } 
    };
    const checkClick = (ck:number)=>{
      store.dispatch(SET_CARDATA_CHECK,{gid:props.itemdata.gid,status:ck})
    }
    return {
      ...toRefs(state),
      add,
      sub,
      checkClick
    };
  },
});
</script>

<style lang='scss' scoped>

.cartitem {
  width: 100%;
  border: 10px solid var(--color-background-light);
  border-radius: 20px;
  background: var(--color-background);
  padding: 5px;
  border-bottom: 5px;
	display: flex;
	flex-direction: row;
	align-items: center;
	
	.itemimg{
		img{
			width: 5rem;
			height: 6rem;
			border-radius: 5px;
		}
	}
	.info{
		display: flex;
		flex-direction: column;
		.gn{
			padding: 5px;
			color: #000;
		}
		.p-num{
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			padding: 10px 5px;
			.num{
				button{
          border: none;
          box-shadow: -1px 1px 5px 1px rgba(35, 56, 63, 0.37);
          width: 1.5rem;;
          height: 1.5rem;
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