<template>
  <div class="cardbody"  @click="goodsclick">
    <div class="imgcon">
      <!-- goodsitem.goods_link  -->
        <img :src="imgsrc" alt="" @load="imgload"/>
    </div>

    <div class="bottom">
      <div class="aaa">
        <a href="javascript:;" target="_blank">
          <span class="goodsname">{{ goodsitem.g_name }}</span>
        </a>
      </div>

      <div class="more_wrap">
        <span class="price">￥{{ goodsitem.price }}</span>
        <span class="like iconfont iconxingxing"></span>
        <span class="inventory">库存：{{ goodsitem.inventory }}</span>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Igoods_list_item } from "@/typings";
import { defineComponent, PropType, reactive } from "vue";
import { useRouter } from 'vue-router'
export default defineComponent({
  name: "goodsitem",
  props: {
    goodsitem: Object as PropType<Igoods_list_item>,
  },
  setup(props,ctx){
    const router = useRouter();
    const imgload = ()=>{
      ctx.emit('imgload');
    }
    const goodsclick = ()=>{
      router.push('/details/'+props.goodsitem.iid)
    }
    let ii = props.goodsitem.top_imgs.split(',')[0];
    let imgsrc = ii.trim() ==""?props.goodsitem.top_imgs.split(',')[1]:ii;
    return {
      imgload,
      goodsclick,
      imgsrc
    }
  }
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
        img{
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
          width: 100%;
          a{
            width: 100%;
            display: inline-block;
            height: 20px;
            padding:3px 1px;
            overflow: hidden;
            .goodsname{
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        
        .more_wrap{
          align-self: center;
          .price {
            font-size: 14px;
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