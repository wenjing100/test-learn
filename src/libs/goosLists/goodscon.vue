<template>
  <div class="goodscon">
      <div v-for="(item,index) of goods_data" :key="index" class="singleitem">
          <goodsitem :goodsitem="item"></goodsitem>
      </div>
  </div>
</template>

<script lang='ts'>
import { Igoods_list_item } from "@/typings";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "goodscon",
  props:{
      goods_data:{
          type:Array as PropType<Igoods_list_item[]>
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