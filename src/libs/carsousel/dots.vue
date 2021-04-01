<template>
  <div class="dots-wraper" v-if="hasDot">
    <div class="dotitem" v-for="item in Len" :key="item">
        <a href="javascript:;" class="dotlink"
            :style="{backgroundColor:(item - 1) === currentIndex ? dotBgColor : '#ffffff' }"
            @click="dotClick(item - 1)"
        ></a>
    </div>
  </div>
</template>

<script lang="ts">
import { watchEffect,ref } from 'vue';
  export default {
      name: 'car-dots',
      props: {
          itemLen:Number,
          hasDot: {
              type:Boolean,
              default:true
          },
          currentIndex:Number,
          dotBgColor: {
              type:String,
              default:'#ff5000'
          }
      },
      setup(props,ctx) {
          let Len = ref(props.itemLen);
          const dotClick = (index:number)=>{
              ctx.emit('dotClick',index)
          }
          return {
              dotClick,
              Len
          }
      }
  }
</script>

<style lang="scss" scoped>
.dots-wraper{
    min-width: 100px;
    height: 13px;
    border-radius: 10px;
    position: absolute;
    bottom: 15px;
    text-align: center;
    font-size: 0;
    left: 50%;
    margin-left: -50px;
    z-index: 1;
    background-color:rgba($color: #000000, $alpha:.3);

    .dotitem{
    display: inline-block;
    margin: 3px;

    .dotlink{
      display: block;
      padding-top: 8px;
      width: 8px;
      height: 0px;
      border-radius: 50%;
      background: #fff;
    }
}
}

</style>