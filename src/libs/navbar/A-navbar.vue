<template>
    <div class="navbar" :style="{backgroundColor:bgcolor}">
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script lang='ts'>
  export default {
      name: 'navbar',
      props:{
          bgcolor:{
            type:String,
            default:'var(--color-tint)'
          }
      }
  }
</script>

<style lang='scss' scoped>
.navbar{
    width: 100%;
    height: 44px;
    line-height: 44px;
    position: fixed;
    top: 0;
    z-index: 11;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 1px 0 rgba(0, 0, 0, .2);
    background: var(--color-tint);
    padding: 0 10px;
    font-size: 16px;
    .left{
        min-width: 20%;
    }
    .right{
        min-width: 20%;
    }
    .center{
        display: flex;
        justify-content: center;
        text-align: center;
    }
    
}



</style>