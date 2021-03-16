<template>
  <div class="cardbody" :style="{ width: w, height: h }">
    <div class="imgcon">
      <a :href="goodsitem.goods_link" target="_blank">
        <img :src="goodsitem.img_lg" alt="" />
      </a>
    </div>

    <div class="bottom">
      <a :href="goodsitem.goods_link" target="_blank">
        <span class="goodsname">{{ goodsitem.name }}</span>
      </a>

      <div class="more_wrap">
        <span class="price">￥{{ goodsitem.price }}</span>
        <span class="like">☆</span>
        <span class="inventory">{{ goodsitem.inventory }}</span>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Igoods_list_item } from "@/typings";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "goodsitem",
  props: {
    goodsitem: Object as PropType<Igoods_list_item>,
    w: {
      type: String,
      default: "200px",
    },
    h: {
      type: String,
      default: "280px",
    },
  },
});
</script>

<style lang='scss' scoped>
.cardbody {
    padding: 3px;
    box-sizing: border-box;
    border: 1px solid black;
    .imgcon{
        width: 100%;
        height: 80%;
        border-radius: 3px;
        overflow: hidden;
        a img{
            width: 100%;
            height: 100%;
        }
    }
    .bottom{
        display: flex;
        flex-direction: column;
        a{
            display: inline-block;
        }
        .price {
            color: var(--color-high-text);
        }
    }
    
}
</style>