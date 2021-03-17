<template>
  <div class="cardbody">
    <div class="imgcon">
      <a :href="goodsitem.goods_link" target="_blank">
        <img :src="goodsitem.img_lg" alt="" />
      </a>
    </div>

    <div class="bottom">
      <div class="aaa">
        <a :href="goodsitem.goods_link" target="_blank">
          <span class="goodsname">{{ goodsitem.name }}</span>
        </a>
      </div>
      
      <div class="more_wrap">
        <span class="price">￥{{ goodsitem.price }}</span>
        <span class="like iconfont iconxingxing"></span>
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
  },
});
</script>

<style lang='scss' scoped>
.cardbody {
    padding: 3px;
    box-sizing: border-box;
    position: relative;
    /*border: 1px solid black;*/
    .imgcon{
        width: 100%;
        overflow: hidden;
        padding-bottom: 5px;
        a img{
            width: 100%;
            border-radius: 5px;
        }
    }
    .bottom{
        width: 100%;
        display: flex;
        flex-direction: column;
        font-size: 12px;
        .aaa{
          a{
            width: 100%;
            display: inline-block;
            height: 20px;
            padding:3px 1px;
            overflow: hidden;
            .goodsname{
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        
        .more_wrap{
          align-self: center;
          .price {
            color: var(--color-high-text);
          }
          .like{
            color:var(--color-high-text);
            font-size: 14px;
            padding: 0 5px;
          }
        }
        
    }
    
}
</style>