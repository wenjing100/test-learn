<template>
  <div class="goodscon">
      <div v-for="(item,index) of g_data" :key="index" class="singleitem">
          <goodsitem :goodsitem="item" @carImgload="carImgload"></goodsitem>
      </div>
  </div>
</template>

<script lang='ts'>
import { Igoods_list_item } from "@/typings";
import { defineComponent, PropType, reactive, toRefs, watch } from "vue";
export default defineComponent({
  name: "goodscon",
  props:{
      goods_data:{
        type:Array as PropType<Igoods_list_item[]>
      }
  },
  emits:[
    'carImgload'
  ],
  setup(p,ctx){
    const state = reactive({
      g_data:p.goods_data
    })
    const carImgload = ()=> {
      ctx.emit('carImgload');
    }
    // watch(()=>{
    //   return p.goods_data;
    // },(val)=>{
    //   state.g_data = val;
    // })
    return{
      ...toRefs(state),
      carImgload
    }
  }
});
</script>

<style lang='scss' scoped>
.goodscon{
  width: 100%;
  padding: 1px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 10px;
  .singleitem{
    width: 48%;
  }
}
</style>