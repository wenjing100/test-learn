<template>
  <van-swipe class="my-swipe" :autoplay="3000"
    indicator-color="#ff8198" lazy-render
    :stop-propagation="false"
  >
    <van-swipe-item v-for="(image,index) in images" :key="image" @click="vSwiperClick(index)">
      <img :src="image" />
    </van-swipe-item>
  </van-swipe>
</template>

<script lang='ts'>
import { defineComponent} from 'vue';
  export default defineComponent({
      name: 'vswiper',
      props:{
        images:{
          type:Array,
          default:['http://47.110.38.241/default-swiper.jpg']
        }
      },
      emits:['vSwiperClick'],
      setup(p,{emit}){

        const vSwiperClick = (i)=>{
          //轮播图点击事件
        }
        return{
          vSwiperClick
        }
      }
  })
</script>

<style lang='scss' scoped>
  .my-swipe {

    .van-swipe-item{
      color: #fff;
      font-size: 20px;
      line-height: 150px;
      text-align: center;
      background-color: #e0e0e0e0;
      img{
        width: inherit;
        height: inherit;
      }
    }
  }
</style>